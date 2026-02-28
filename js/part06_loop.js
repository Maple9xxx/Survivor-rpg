// ================================================
// PHẦN 6: GS.initWeapons + GS.gameLoop (khung)
// ================================================
Object.assign(GS, {

    initWeapons() {
        const cd = this.currentCharDef;
        // Vũ khí chính theo nhân vật
        this.weapons = [
            {
                id:       cd.wpn,
                timer:    0,
                level:    1,
                evoReady: false,
                evoTimer: 0
            }
        ];
        // Weapon slots mở rộng (level up sẽ thêm)
        this.weaponSlots = 1;
        this.maxWeaponSlots = 6;
    },

    addWeapon(wpnId) {
        // Kiểm tra đã có chưa
        const exist = this.weapons.find(w => w.id === wpnId);
        if (exist) {
            // Tăng level
            if (exist.level < 5) {
                exist.level++;
                this.toast(`⬆️ ${DB.weapons[wpnId]?.name} lên LV${exist.level}!`);
            }
            return;
        }
        // Thêm mới nếu còn slot
        if (this.weapons.length < this.maxWeaponSlots) {
            this.weapons.push({
                id: wpnId, timer:0,
                level:1, evoReady:false, evoTimer:0
            });
            this.toast(`🆕 Nhận vũ khí: ${DB.weapons[wpnId]?.name}!`);
        }
    },

    evolveWeapon(wpnId) {
        const evoMap = {
            Sword:     "SwordEvo",
            Lightning: "LightningEvo",
            Bow:       "BowEvo",
            IceBeam:   "IceBeamEvo",
            Dagger:    "DaggerEvo",
            Hammer:    "HammerEvo"
        };
        const evoId = evoMap[wpnId];
        if (!evoId) return;
        const w = this.weapons.find(x => x.id === wpnId);
        if (!w) return;
        w.id      = evoId;
        w.level   = 5;
        w.evoReady= false;
        this.toast(`✨ ${DB.weapons[evoId]?.name} TIẾN HÓA!`);
        this.flashScreen("#ffd700", 300);
        AudioEngine.playEvo();
    },

    // ─────────────────────────────────────────
    restartSameMap() {
        if (this.lastMapId) this.startGame(this.lastMapId);
    },

    // ─────────────────────────────────────────
    // checkWinLose được gọi trong gameLoop
    checkWinLose() {
        if (!this.running) return;

        // Thua: máu = 0
        if (this.player.hp <= 0) {
            this.player.hp = 0;
            this.endGame(false);
            return;
        }

        // Thắng: hết thời gian + boss đã chết
        if (this.gameTimer >= this.currentMap.duration) {
            if (!this.bossSpawned ||
                (this.currentBoss && this.currentBoss.dead) ||
                !this.currentBoss) {
                this.endGame(true);
            }
        }
    },

    // ─────────────────────────────────────────
    // Level Up
    gainExp(amount) {
        const bonus = 1 + (this.player.expBonus||0);
        this.exp += Math.floor(amount * bonus);
        while (this.exp >= this.expToNext) {
            this.exp      -= this.expToNext;
            this.level    += 1;
            this.expToNext = Math.floor(
                this.expToNext * 1.18 + 10);
            this.onLevelUp();
        }
    },

    onLevelUp() {
        this.paused = true;
        AudioEngine.playLevelUp();
        this.flashScreen("#ffd700", 200);
        this.showLevelUpCards();
    },

    showLevelUpCards() {
        const pool   = this.buildLevelUpPool();
        const picks  = this.pickCards(pool, 3);
        const screen = document.getElementById("screen-levelup");
        const cards  = document.getElementById("levelup-cards");
        cards.innerHTML = "";

        picks.forEach(card => {
            const div = document.createElement("div");
            div.className = "levelup-card";
            div.innerHTML =
                `<div class="card-icon">${card.icon}</div>
                 <div class="card-name">${card.name}</div>
                 <div class="card-desc">${card.desc}</div>`;
            div.onclick = () => {
                this.applyLevelUpCard(card);
                screen.classList.add("hidden");
                this.paused = false;
                this._lastTs = performance.now();
            };
            cards.appendChild(div);
        });

        screen.classList.remove("hidden");
    },

    pickCards(pool, n) {
        const shuffled = [...pool]
            .sort(() => Math.random()-0.5);
        return shuffled.slice(0, Math.min(n, shuffled.length));
    },

    buildLevelUpPool() {
        // Import từ DB.levelUpCards (định nghĩa ở Phần 18)
        if (!DB.levelUpCards) return [];
        const pool = [];
        for (const key of Object.keys(DB.levelUpCards)) {
            const card = DB.levelUpCards[key];
            // Lọc card phù hợp
            if (card.charOnly &&
                card.charOnly !== this.player.charId) continue;
            if (card.requireWeapon &&
                !this.weapons.find(w=>w.id===card.requireWeapon))
                continue;
            // Không thêm evo nếu chưa đủ điều kiện
            if (card.type === "evo") {
                const w = this.weapons.find(
                    x => x.id === card.requireWeapon);
                if (!w || w.level < 5) continue;
            }
            pool.push({ ...card, id: key });
        }
        // Thêm weapon mới nếu còn slot
        if (this.weapons.length < this.maxWeaponSlots) {
            const allWpns = Object.keys(DB.weapons)
                .filter(id => !id.endsWith("Evo"))
                .filter(id => !this.weapons.find(w=>w.id===id));
            for (const wid of allWpns) {
                const wd = DB.weapons[wid];
                pool.push({
                    id:   "wpn_"+wid,
                    icon: wd.icon,
                    name: wd.name,
                    desc: wd.desc,
                    type: "weapon",
                    weaponId: wid
                });
            }
        }
        return pool;
    },

    applyLevelUpCard(card) {
        const p = this.player;
        switch(card.type) {
            case "weapon":
                this.addWeapon(card.weaponId);
                break;
            case "evo":
                this.evolveWeapon(card.requireWeapon);
                break;
            case "stat":
                if (card.stat === "hp") {
                    p.maxHp += card.val;
                    p.hp     = Math.min(p.hp + card.val, p.maxHp);
                } else if (card.stat === "atkMult") {
                    p.atkMult += card.val;
                } else if (card.stat === "spd") {
                    p.spd += card.val;
                } else if (card.stat === "magnetRange") {
                    p.magnetRange += card.val;
                } else if (card.stat === "armor") {
                    p.armor = Math.min(0.75, p.armor + card.val);
                } else if (card.stat === "cdReduce") {
                    p.cdReduce = Math.min(0.6,
                        p.cdReduce + card.val);
                } else if (card.stat === "skillDmgBonus") {
                    p.skillDmgBonus += card.val;
                } else if (card.stat === "expBonus") {
                    p.expBonus += card.val;
                } else if (card.stat === "shield") {
                    p.maxShield += card.val;
                    p.shield    += card.val;
                }
                break;
            case "heal":
                p.hp = Math.min(p.maxHp,
                    p.hp + Math.floor(p.maxHp * (card.pct||0.3)));
                this.spawnParticle(p.x, p.y,
                    "💚+HP","#00ff88",900);
                break;
        }
        this.toast(`✅ ${card.name}`);
    },

    // ─────────────────────────────────────────
    // GAME LOOP KHUNG - sẽ được patch ở Phần 19
    gameLoop(ts) {
        if (!this.running) return;
        this.animId = requestAnimationFrame(
            t => this.gameLoop(t));
        // Nội dung loop thực sẽ patch ở Phần 19
    }
});

// ================================================
// PASTE PHẦN 7 TIẾP THEO VÀO ĐÂY
// ================================================
