// ================================================
// PHẦN 7: GS.damagePlayer + GS.updateWeapons
// ================================================
Object.assign(GS, {

    damagePlayer(dmg, showFx=true) {
        const p = this.player;
        if (p.iframes > 0) return;

        // Knight active: miễn dame
        if (p.shieldActive) {
            // Phản đòn
            const near = this.getEnemiesInRadius(p.x, p.y, 120);
            near.forEach(e => this.dealDamage(e,
                dmg * 1.5, false));
            this.spawnParticle(p.x, p.y,
                "🛡️REFLECT","#0088ff", 700);
            return;
        }

        // Giáp giảm dame
        let finalDmg = Math.floor(dmg * (1-(p.armor||0)));

        // Khiên hấp thụ trước (knight passive)
        if (p.shield > 0) {
            const absorbed = Math.min(p.shield, finalDmg);
            p.shield  -= absorbed;
            finalDmg  -= absorbed;
            this.spawnParticle(p.x, p.y-20,
                `🛡️${absorbed}`, "#0af", 600);
        }

        if (finalDmg <= 0) {
            p.iframes = 180;
            return;
        }

        p.hp = Math.max(0, p.hp - finalDmg);
        p.iframes = 600;
        this.totalDmgTaken += finalDmg;

        if (showFx) {
            this.flashScreen("#ff0000", 100);
            this.spawnParticle(p.x, p.y-16,
                `-${finalDmg}`, "#ff4444", 700);
            AudioEngine.playHurt();
        }

        // Knight shield regen reset
        p.shieldRegenTimer = 0;
    },

    // ─────────────────────────────────────────
    updateWeapons(dt) {
        for (const w of this.weapons) {
            w.timer += dt;
            const def = DB.weapons[w.id];
            if (!def) continue;

            // Tính fire rate theo level & cd reduce
            const cdMult = 1 - Math.min(0.6,
                (this.player.cdReduce||0));
            const fireRate = def.fireRate * cdMult
                / (1 + (w.level-1)*0.12);

            if (w.timer >= fireRate) {
                w.timer = 0;
                this.fireWeapon(w, def);
            }
        }

        // Knight shield regen
        const p = this.player;
        if (p.maxShield > 0 && p.shield < p.maxShield) {
            p.shieldRegenTimer += dt;
            if (p.shieldRegenTimer >= 3000) {
                p.shieldRegenTimer = 0;
                p.shield = Math.min(
                    p.maxShield, p.shield + 5);
            }
        }

        // Warrior passive: kill bonus
        if (p.charId === "warrior" ||
            p.charId === "swordsman") {
            // warriorKillBonus tăng theo kills
            p.atkMult = (this.currentCharDef.baseAtk||1.0)
                + (this.save.permUpgrades.startAtk||0)
                * DB.permUpgrades.find(x=>
                    x.id==="startAtk").val
                + Math.min(0.5,
                    (this.kills * 0.01));
        }

        // Mage passive: overload
        if (p.charId === "mage") {
            p.mageOverloadTimer += dt;
            if (!p.mageOverloadActive &&
                p.mageOverloadTimer >= p.mageOverloadCd) {
                p.mageOverloadTimer  = 0;
                p.mageOverloadActive = true;
                p.skillDmgBonus += 0.20;
                this.spawnParticle(p.x, p.y-20,
                    "⚡OVERLOAD","#ff88ff",1200);
                setTimeout(() => {
                    p.mageOverloadActive = false;
                    p.skillDmgBonus = Math.max(0,
                        p.skillDmgBonus - 0.20);
                }, 5000);
            }
        }

        // Hunter passive: tốc bắn bonus
        // (xử lý qua hunterFireBonus trong fireWeapon)

        // Assassin passive: invisible after skill
        if (p.charId === "assassin" && p.shadowReady) {
            p.invisible = true;
        }
    },

    // ─────────────────────────────────────────
    fireWeapon(w, def) {
        const p   = this.player;
        const dmg = Math.floor(
            def.baseDmg
            * (p.atkMult||1)
            * (1 + (w.level-1)*0.18)
        );

        // Hunter passive: tốc bắn +20%
        // (đã tính trong fireRate ở updateWeapons)

        switch(w.id) {
            case "Sword":
            case "SwordEvo":
                this._fireSword(w, def, dmg); break;

            case "Lightning":
            case "LightningEvo":
                this._fireLightning(w, def, dmg); break;

            case "Bow":
            case "BowEvo":
                this._fireBow(w, def, dmg); break;

            case "IceBeam":
            case "IceBeamEvo":
                this._fireIceBeam(w, def, dmg); break;

            case "Dagger":
            case "DaggerEvo":
                this._fireDagger(w, def, dmg); break;

            case "Hammer":
            case "HammerEvo":
                this._fireHammer(w, def, dmg); break;

            case "KnifeRain":
                this._fireKnifeRain(w, def, dmg); break;

            case "Shield":
                this._fireOrbShield(w, def, dmg); break;

            case "HolyLight":
                this._fireHolyLight(w, def, dmg); break;
        }
    },

    // ─────────────────────────────────────────
    _fireSword(w, def, dmg) {
        // AoE xung quanh player
        const p      = this.player;
        const radius = def.aoeR
            * (1 + (w.level-1)*0.10);
        const hits   = this.getEnemiesInRadius(
            p.x, p.y, radius);

        hits.forEach(e => {
            let d = dmg;
            // SwordEvo: hút máu 5%
            if (w.id === "SwordEvo") {
                const heal = Math.floor(d * 0.05);
                p.hp = Math.min(p.maxHp, p.hp + heal);
            }
            this.dealDamage(e, d, true);
        });

        // Hiệu ứng chém xoáy
        this.spawnParticle(p.x, p.y,
            "🌀", "#ff8844", 400);
        if (hits.length > 0) AudioEngine.playSwing();
    },

    _fireLightning(w, def, dmg) {
        // Sét nảy giữa các kẻ địch
        const p       = this.player;
        let   bounces = def.bounce
            + (w.level >= 3 ? 1 : 0);
        const nearest = this.getNearestEnemy(p.x, p.y);
        if (!nearest) return;

        let   current = nearest;
        const hit     = new Set();
        hit.add(current);
        this.dealDamage(current, dmg, true);
        this.spawnParticle(current.x, current.y,
            "⚡", "#ffff00", 400);

        // LightningEvo: tê liệt
        if (w.id === "LightningEvo") {
            current.slowed    = true;
            current.slowPct   = 0.6;
            current.slowTimer = 500;
        }

        for (let i = 0; i < bounces-1; i++) {
            let   next = null;
            let   minD = Infinity;
            for (const e of this.enemies) {
                if (e.dead || hit.has(e)) continue;
                const d = Math.hypot(
                    e.x-current.x, e.y-current.y);
                if (d < def.range && d < minD) {
                    minD=d; next=e;
                }
            }
            if (!next) break;
            hit.add(next);
            // Dame giảm dần
            const bd = Math.floor(dmg * (0.75**i));
            this.dealDamage(next, bd, true);
            this.spawnParticle(next.x, next.y,
                "⚡", "#ffff88", 350);
            if (w.id === "LightningEvo") {
                next.slowed    = true;
                next.slowPct   = 0.6;
                next.slowTimer = 500;
            }
            current = next;
        }
        AudioEngine.playLightning();
    }
});

// ================================================
// PASTE PHẦN 8 TIẾP THEO VÀO ĐÂY
// ================================================
