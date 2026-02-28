================================================
// PHẦN 1: DATABASE - MAPS & CHARS
// ================================================
const DB = {
  maps: [
    { id:"forest",   icon:"🌲", name:"Rừng Xanh",
      desc:"Bản đồ khởi đầu dễ thở",
      bgTop:"#0d1f0d", bgBottom:"#1a2e1a",
      diff:2, duration:120000, envHazard:null,
      bossAt:90000, events:["wolf_pack","heal_spring"] },
    { id:"desert",   icon:"🏜️", name:"Sa Mạc Khô",
      desc:"Cát bão giảm tầm nhìn",
      bgTop:"#2e1f0a", bgBottom:"#3d2a0f",
      diff:3, duration:150000, envHazard:"sandstorm",
      bossAt:110000, events:["sand_storm","scorpion_raid"] },
    { id:"volcano",  icon:"🌋", name:"Núi Lửa",
      desc:"Dung nham gây sát thương định kỳ",
      bgTop:"#1f0a00", bgBottom:"#3d1500",
      diff:4, duration:150000, envHazard:"lava",
      bossAt:110000, events:["lava_burst","fire_rain"] },
    { id:"sky",      icon:"☁️", name:"Bầu Trời",
      desc:"Gió mạnh đẩy player ngẫu nhiên",
      bgTop:"#0a1a3d", bgBottom:"#1a3d6e",
      diff:3, duration:140000, envHazard:"wind",
      bossAt:100000, events:["thunder_storm","wind_gust"] },
    { id:"cemetery", icon:"⚰️", name:"Nghĩa Địa",
      desc:"Bóng tối giới hạn tầm nhìn",
      bgTop:"#0a0a1a", bgBottom:"#111122",
      diff:4, duration:160000, envHazard:"darkness",
      bossAt:120000, events:["undead_horde","soul_drain"] },
    { id:"abyss",    icon:"🕳️", name:"Vực Thẳm",
      desc:"Hút lực kéo về tâm màn hình",
      bgTop:"#050010", bgBottom:"#0a0020",
      diff:5, duration:180000, envHazard:"gravity",
      bossAt:140000, events:["void_rift","chaos_surge"] }
  ],

  chars: [
    { id:"swordsman", icon:"⚔️", name:"Kiếm Sĩ",
      desc:"Chiến binh cận chiến mạnh mẽ",
      color:"#ff4444", unlockCost:0,
      wpn:"Sword",
      baseHp:150, baseSpd:2.8, baseAtk:1.0,
      passive: { name:"Bá Đạo",
        desc:"Mỗi kill: +1% ATK (tối đa 50%)",
        id:"warrior_passive" },
      active:  { name:"Chém Xoáy", icon:"🌀",
        desc:"Xoáy 360° gây 3x ATK quanh người",
        cooldown:6000, duration:600, dmgMult:3.0 },
      active2: null },

    { id:"mage", icon:"🧙", name:"Pháp Sư",
      desc:"Phép thuật mạnh, máu ít",
      color:"#8800ff", unlockCost:100,
      wpn:"Lightning",
      baseHp:100, baseSpd:2.5, baseAtk:1.2,
      passive: { name:"Quá Tải",
        desc:"Cứ 10 giây tăng 20% Skill DMG trong 5s",
        id:"mage_passive" },
      active:  { name:"Thiên Lôi", icon:"⚡",
        desc:"Sét đánh 5 kẻ địch gần nhất",
        cooldown:7000, duration:500, dmgMult:4.0 },
      active2: { name:"Hố Đen", icon:"🌀",
        desc:"Hút tất cả quái về tâm + gây dame",
        cooldown:18000, dmgMult:2.5 } },

    { id:"hunter", icon:"🏹", name:"Thợ Săn",
      desc:"Tốc độ cao, bắn xa",
      color:"#00cc44", unlockCost:120,
      wpn:"Bow",
      baseHp:110, baseSpd:3.5, baseAtk:0.9,
      passive: { name:"Mắt Đại Bàng",
        desc:"+20% tốc bắn, mũi tên xuyên 1 kẻ địch",
        id:"hunter_passive" },
      active:  { name:"Mưa Tên", icon:"🏹",
        desc:"Bắn 20 mũi tên theo mọi hướng",
        cooldown:8000, duration:1000, dmgMult:1.5 },
      active2: null },

    { id:"icemage", icon:"❄️", name:"Pháp Sư Băng",
      desc:"Làm chậm và đóng băng kẻ địch",
      color:"#00ccff", unlockCost:150,
      wpn:"IceBeam",
      baseHp:105, baseSpd:2.6, baseAtk:1.0,
      passive: { name:"Buốt Giá",
        desc:"Đòn đánh có 25% đóng băng 1.5s",
        id:"icemage_passive" },
      active:  { name:"Bão Tuyết", icon:"🌨️",
        desc:"Băng bao phủ toàn màn hình 3s",
        cooldown:10000, duration:3000, dmgMult:2.0 },
      active2: null },

    { id:"assassin", icon:"🗡️", name:"Sát Thủ",
      desc:"Tàng hình, dame cực cao",
      color:"#aa00ff", unlockCost:200,
      wpn:"Dagger",
      baseHp:90, baseSpd:3.8, baseAtk:1.5,
      passive: { name:"Bóng Tối",
        desc:"Sau skill: tàng hình 2s, đòn tiếp theo 3x dame",
        id:"assassin_passive" },
      active:  { name:"Ám Sát", icon:"💀",
        desc:"Dash + đòn chí mạng 8x ATK kẻ gần nhất",
        cooldown:9000, duration:200, dmgMult:8.0 },
      active2: null },

    { id:"knight", icon:"🛡️", name:"Hiệp Sĩ",
      desc:"Khiên hấp thụ sát thương",
      color:"#0088ff", unlockCost:180,
      wpn:"Hammer",
      baseHp:200, baseSpd:2.2, baseAtk:0.85,
      passive: { name:"Tường Thép",
        desc:"Khiên 60HP tự hồi 5HP/3s",
        id:"knight_passive" },
      active:  { name:"Bức Tường", icon:"🛡️",
        desc:"Khiên thánh 3s: miễn dame + phản đòn",
        cooldown:12000, duration:3000, dmgMult:1.5 },
      active2: { name:"Thánh Kích", icon:"⚡",
        desc:"Dash + AoE stun quái xung quanh",
        cooldown:15000, aoeR:80, dmgMult:2.5 } }
  ]
};

// ================================================
// PASTE PHẦN 2 TIẾP THEO VÀO ĐÂY
// ================================================
// ================================================
// PHẦN 2: DB.weapons
// ================================================
DB.weapons = {
    Sword: {
        icon:"⚔️", name:"Kiếm", baseDmg:28,
        fireRate:600, range:70, projSpeed:0,
        aoe:true, aoeR:70, pierce:0,
        color:"#ff8844",
        desc:"Chém vòng quanh người"
    },
    SwordEvo: {
        icon:"🗡️", name:"Kiếm Huyết", baseDmg:55,
        fireRate:500, range:90, projSpeed:0,
        aoe:true, aoeR:90, pierce:0,
        color:"#ff0044",
        desc:"Chém xoáy + hút máu 5%"
    },
    Lightning: {
        icon:"⚡", name:"Sét", baseDmg:32,
        fireRate:700, range:280, projSpeed:0,
        aoe:false, bounce:3,
        color:"#ffff00",
        desc:"Sét nảy giữa 3 kẻ địch"
    },
    LightningEvo: {
        icon:"🌩️", name:"Sét Bão", baseDmg:60,
        fireRate:600, range:320, projSpeed:0,
        aoe:false, bounce:5,
        color:"#aaffff",
        desc:"Sét nảy 5 lần + tê liệt 0.5s"
    },
    Bow: {
        icon:"🏹", name:"Cung", baseDmg:24,
        fireRate:550, range:300, projSpeed:7,
        aoe:false, pierce:1,
        color:"#88ff44",
        desc:"Mũi tên xuyên 1 kẻ địch"
    },
    BowEvo: {
        icon:"🎯", name:"Cung Thần", baseDmg:48,
        fireRate:450, range:360, projSpeed:9,
        aoe:false, pierce:3,
        color:"#00ff88",
        desc:"Mũi tên xuyên 3 kẻ địch + gây chảy máu"
    },
    IceBeam: {
        icon:"❄️", name:"Tia Băng", baseDmg:20,
        fireRate:480, range:260, projSpeed:6,
        aoe:false, slow:0.35, slowDur:1500,
        color:"#00ccff",
        desc:"Làm chậm kẻ địch 35%"
    },
    IceBeamEvo: {
        icon:"🧊", name:"Băng Hà", baseDmg:38,
        fireRate:400, range:300, projSpeed:7,
        aoe:true, aoeR:50, slow:0.5, slowDur:2500,
        freeze:true, freezeChance:0.2,
        color:"#88eeff",
        desc:"Làm chậm 50% + 20% đóng băng"
    },
    Dagger: {
        icon:"🗡️", name:"Dao Găm", baseDmg:18,
        fireRate:250, range:220, projSpeed:10,
        aoe:false, pierce:0, crit:0.25,
        color:"#cc44ff",
        desc:"Tốc độ cao + 25% chí mạng 2x"
    },
    DaggerEvo: {
        icon:"☠️", name:"Dao Độc", baseDmg:32,
        fireRate:200, range:260, projSpeed:12,
        aoe:false, pierce:1, crit:0.35,
        poison:true, poisonDmg:8, poisonDur:3000,
        color:"#88ff00",
        desc:"Xuyên giáp + độc 8dmg/giây"
    },
    Hammer: {
        icon:"🔨", name:"Búa", baseDmg:55,
        fireRate:1200, range:100, projSpeed:0,
        aoe:true, aoeR:100, stun:true, stunDur:800,
        color:"#ffaa00",
        desc:"AoE lớn + choáng 0.8s"
    },
    HammerEvo: {
        icon:"⚒️", name:"Búa Thần", baseDmg:100,
        fireRate:1000, range:130, projSpeed:0,
        aoe:true, aoeR:130, stun:true, stunDur:1200,
        shockwave:true,
        color:"#ffdd00",
        desc:"AoE khổng lồ + shockwave lan xa"
    },
    KnifeRain: {
        icon:"🔪", name:"Mưa Dao", baseDmg:15,
        fireRate:300, range:240, projSpeed:8,
        aoe:false, pierce:0, count:3,
        spread:30,
        color:"#ffffff",
        desc:"Bắn 3 dao cùng lúc"
    },
    Shield: {
        icon:"🛡️", name:"Khiên Quay", baseDmg:20,
        fireRate:1800, range:80, projSpeed:0,
        aoe:true, aoeR:80, orbCount:3,
        color:"#0088ff",
        desc:"3 khiên quay quanh người"
    },
    HolyLight: {
        icon:"✨", name:"Ánh Thánh", baseDmg:35,
        fireRate:900, range:200, projSpeed:0,
        aoe:true, aoeR:120, heal:true, healPct:0.02,
        color:"#ffffaa",
        desc:"AoE thánh + hồi 2% máu tối đa"
    }
};

// ================================================
// PASTE PHẦN 3 TIẾP THEO VÀO ĐÂY
// ================================================
// ================================================
// PHẦN 3: DB.permUpgrades + DB.mobs
// ================================================
DB.permUpgrades = [
    { id:"startHp",     icon:"❤️",  name:"HP Khởi Đầu",
      desc:"+30 HP tối đa mỗi cấp",
      costBase:80,  costMult:1.4, maxLv:10,
      stat:"maxHp", val:30 },
    { id:"startAtk",    icon:"⚔️",  name:"ATK Khởi Đầu",
      desc:"+8% sát thương mỗi cấp",
      costBase:100, costMult:1.5, maxLv:10,
      stat:"atkMult", val:0.08 },
    { id:"startSpd",    icon:"👟",  name:"SPD Khởi Đầu",
      desc:"+0.15 tốc độ mỗi cấp",
      costBase:90,  costMult:1.4, maxLv:8,
      stat:"spd", val:0.15 },
    { id:"cdReduce",    icon:"⏱️",  name:"Giảm Cooldown",
      desc:"-5% CD skill mỗi cấp",
      costBase:120, costMult:1.6, maxLv:6,
      stat:"cdReduce", val:0.05 },
    { id:"luck",        icon:"🍀",  name:"May Mắn",
      desc:"+10% tỉ lệ drop EXP & Coin",
      costBase:70,  costMult:1.3, maxLv:8,
      stat:"luck", val:0.10 },
    { id:"magnetRange", icon:"🧲",  name:"Nam Châm",
      desc:"+25 tầm hút vật phẩm",
      costBase:60,  costMult:1.3, maxLv:8,
      stat:"magnetRange", val:25 },
    { id:"armor",       icon:"🛡️",  name:"Giáp Vĩnh Viễn",
      desc:"+4% giảm sát thương nhận",
      costBase:110, costMult:1.5, maxLv:8,
      stat:"armor", val:0.04 },
    { id:"expBonus",    icon:"⭐",  name:"Kinh Nghiệm",
      desc:"+12% EXP nhận được",
      costBase:80,  costMult:1.4, maxLv:8,
      stat:"expBonus", val:0.12 }
];

// ─────────────────────────────────────────────
DB.mobs = {
    // ── THƯỜNG ──
    slime: {
        icon:"🟢", name:"Slime",
        hp:40,  spd:1.2, dmg:8,
        exp:4,  coin:0.15,
        r:14, color:"#44ff44",
        isBoss:false
    },
    bat: {
        icon:"🦇", name:"Dơi",
        hp:30,  spd:2.2, dmg:6,
        exp:5,  coin:0.15,
        r:12, color:"#aa44ff",
        isBoss:false
    },
    orc: {
        icon:"👹", name:"Orc",
        hp:90,  spd:1.4, dmg:16,
        exp:10, coin:0.25,
        r:18, color:"#ff8800",
        isBoss:false
    },
    wolf: {
        icon:"🐺", name:"Sói",
        hp:60,  spd:2.8, dmg:12,
        exp:8,  coin:0.20,
        r:15, color:"#888888",
        isBoss:false
    },
    skeleton: {
        icon:"💀", name:"Xương",
        hp:50,  spd:1.6, dmg:10,
        exp:7,  coin:0.20,
        r:14, color:"#eeeecc",
        isBoss:false
    },
    ghost: {
        icon:"👻", name:"Ma",
        hp:45,  spd:1.8, dmg:14,
        exp:9,  coin:0.20,
        r:14, color:"#aaaaff",
        isBoss:false,
        phaseThrough:true
    },
    scorpion: {
        icon:"🦂", name:"Bọ Cạp",
        hp:70,  spd:1.7, dmg:18,
        exp:11, coin:0.25,
        r:16, color:"#ffaa00",
        isBoss:false,
        poisonOnHit:true, poisonDmg:5, poisonDur:2500
    },
    demon: {
        icon:"👿", name:"Ác Quỷ",
        hp:120, spd:1.5, dmg:22,
        exp:15, coin:0.30,
        r:20, color:"#cc0000",
        isBoss:false
    },
    golem: {
        icon:"🗿", name:"Golem",
        hp:200, spd:0.8, dmg:30,
        exp:20, coin:0.40,
        r:24, color:"#888844",
        isBoss:false,
        armor:0.25
    },
    wisp: {
        icon:"✨", name:"Linh Hồn",
        hp:35,  spd:2.5, dmg:10,
        exp:8,  coin:0.18,
        r:12, color:"#ffff88",
        isBoss:false,
        teleport:true, teleportCd:4000
    },
    troll: {
        icon:"🧌", name:"Troll",
        hp:160, spd:1.1, dmg:25,
        exp:18, coin:0.35,
        r:22, color:"#44aa44",
        isBoss:false,
        regen:3
    },
    vampire: {
        icon:"🧛", name:"Ma Cà Rồng",
        hp:100, spd:2.0, dmg:20,
        exp:14, coin:0.30,
        r:17, color:"#880044",
        isBoss:false,
        lifeSteal:0.2
    },

    // ── BOSS ──
    boss_forest: {
        icon:"🐲", name:"Rồng Rừng",
        hp:1200, spd:1.4, dmg:40,
        exp:120, coin:3.0,
        r:36, color:"#00aa00",
        isBoss:true,
        armor:0.15, enrageAt:0.4
    },
    boss_desert: {
        icon:"🦂", name:"Hoàng Đế Bọ Cạp",
        hp:1600, spd:1.6, dmg:50,
        exp:160, coin:4.0,
        r:40, color:"#ffaa00",
        isBoss:true,
        armor:0.20, enrageAt:0.4,
        poisonOnHit:true, poisonDmg:8, poisonDur:3000
    },
    boss_volcano: {
        icon:"🔥", name:"Chúa Lửa",
        hp:1800, spd:1.3, dmg:60,
        exp:180, coin:4.5,
        r:42, color:"#ff4400",
        isBoss:true,
        armor:0.25, enrageAt:0.35,
        fireAura:true, fireAuraDmg:5
    },
    boss_sky: {
        icon:"⚡", name:"Thần Sét",
        hp:1500, spd:2.0, dmg:45,
        exp:150, coin:3.8,
        r:38, color:"#ffff00",
        isBoss:true,
        armor:0.18, enrageAt:0.4,
        lightning:true
    },
    boss_cemetery: {
        icon:"💀", name:"Vương Xương",
        hp:2000, spd:1.2, dmg:55,
        exp:200, coin:5.0,
        r:44, color:"#8888ff",
        isBoss:true,
        armor:0.30, enrageAt:0.3,
        summonMinions:true
    },
    boss_abyss: {
        icon:"👁️", name:"Mắt Hư Vô",
        hp:2500, spd:1.5, dmg:70,
        exp:250, coin:6.0,
        r:48, color:"#aa00ff",
        isBoss:true,
        armor:0.35, enrageAt:0.3,
        phaseThrough:true, teleport:true, teleportCd:5000
    }
};

// ================================================
// PASTE PHẦN 4 TIẾP THEO VÀO ĐÂY
// ================================================
// ================================================
// PHẦN 4: GS - GAME STATE SKELETON
// ================================================
const GS = {
    // ── Canvas ──
    canvas: null, ctx: null,
    W: 0, H: 0,

    // ── State ──
    running: false,
    paused:  false,
    animId:  null,
    _lastTs: 0,

    // ── Save ──
    save: null,

    // ── Map & Char ──
    currentMap:     null,
    currentCharDef: null,
    lastMapId:      null,

    // ── Player ──
    player: null,

    // ── Game Objects ──
    enemies:    [],
    bullets:    [],
    expOrbs:    [],
    coins:      [],
    particles:  [],
    traps:      [],
    orbShields: [],
    clones:     [],

    // ── Weapons ──
    weapons:    [],   // [{id, timer, level, evoReady}]

    // ── Timer & Score ──
    gameTimer:  0,
    kills:      0,
    totalDmgDealt:  0,
    totalSkillDmg:  0,
    totalDmgTaken:  0,
    coinsThisRun:   0,

    // ── Spawn ──
    spawnTimer:     0,
    spawnInterval:  2200,
    spawnCount:     1,
    bossSpawned:    false,
    currentBoss:    null,

    // ── Level & EXP ──
    level:    1,
    exp:      0,
    expToNext: 30,

    // ── Skill ──
    skillCd:   0,
    skill2Cd:  0,
    activeSkillFx: null,

    // ── Map Events ──
    mapEventTimer:   0,
    mapEventInterval:25000,
    activeHazard:    null,
    hazardTimer:     0,
    windPush:        null,
    gravityPull:     false,

    // ── Input ──
    keys:     {},
    joystick: { active:false, dx:0, dy:0 },

    // ── Helpers ──
    getNearestEnemy(x, y, excludeDead=true) {
        let nearest = null, minD = Infinity;
        for (const e of this.enemies) {
            if (excludeDead && e.dead) continue;
            const d = Math.hypot(e.x-x, e.y-y);
            if (d < minD) { minD=d; nearest=e; }
        }
        return nearest;
    },

    getEnemiesInRadius(x, y, r) {
        return this.enemies.filter(e =>
            !e.dead && Math.hypot(e.x-x, e.y-y) <= r);
    },

    spawnParticle(x, y, text, color="#fff", dur=800) {
        this.particles.push({
            x, y, text, color, dur,
            timer: 0,
            vy: -1.2 - Math.random()*0.8,
            vx: (Math.random()-0.5)*1.2
        });
    },

    flashScreen(color="#fff", dur=120) {
        const el = document.getElementById("flash-overlay");
        if (!el) return;
        el.style.background = color;
        el.style.opacity = "0.55";
        setTimeout(() => { el.style.opacity = "0"; }, dur);
    },

    toast(msg, dur=2200) {
        let el = document.getElementById("toast-msg");
        if (!el) {
            el = document.createElement("div");
            el.id = "toast-msg";
            el.style.cssText =
                "position:fixed;bottom:60px;left:50%;" +
                "transform:translateX(-50%);" +
                "background:rgba(0,0,0,0.82);" +
                "color:#fff;padding:8px 18px;" +
                "border-radius:20px;font-size:13px;" +
                "z-index:999;pointer-events:none;" +
                "transition:opacity 0.3s;";
            document.body.appendChild(el);
        }
        el.textContent = msg;
        el.style.opacity = "1";
        clearTimeout(el._t);
        el._t = setTimeout(() => { el.style.opacity="0"; }, dur);
    },

    togglePause() {
        if (!this.running) return;
        this.paused = !this.paused;
        const sc = document.getElementById("screen-pause");
        if (sc) sc.classList.toggle("hidden", !this.paused);
        if (!this.paused) {
            this._lastTs = performance.now();
            AudioEngine.resume();
        }
    },

    endGame(win=false) {
        this.running = false;
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        }
        // Cộng coin vào save
        this.save.coins       += this.coinsThisRun;
        this.save.totalRuns   += 1;
        this.save.totalKills  += this.kills;
        if (win && !this.save.clearedMaps
                .includes(this.currentMap.id)) {
            this.save.clearedMaps.push(this.currentMap.id);
        }
        // Best time
        if (win) {
            const prev = this.save.bestTime[this.currentMap.id]||Infinity;
            if (this.gameTimer < prev)
                this.save.bestTime[this.currentMap.id] = this.gameTimer;
        }
        SaveSystem.save(this.save);

        // Ẩn HUD
        ["hud","hud-exp-bg","hud-lv-text",
         "shield-bar-wrap","boss-bar-wrap",
         "skill-btn","skill2-btn",
         "joystick-zone","settings-btn",
         "joystick-cfg-btn"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add("hidden");
        });

        // Hiển thị màn end
        const fmt = ms => {
            const s = Math.floor(ms/1000);
            return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
        };
        document.getElementById("end-title").textContent =
            win ? "🏆 CHIẾN THẮNG!" : "💀 GAME OVER";
        document.getElementById("end-title").style.color =
            win ? "#ffd700" : "#ff4444";
        document.getElementById("end-map").textContent =
            `🗺️ ${this.currentMap.name}`;
        document.getElementById("end-time").textContent =
            `⏱️ Thời gian: ${fmt(this.gameTimer)}`;
        document.getElementById("end-kills").textContent =
            `💀 Kills: ${this.kills}`;
        document.getElementById("end-dmg").textContent =
            `⚔️ Tổng dame: ${this.totalDmgDealt.toLocaleString()}`;
        document.getElementById("end-skilldmg").textContent =
            `⚡ Dame skill: ${this.totalSkillDmg.toLocaleString()}`;
        document.getElementById("end-taken").textContent =
            `🛡️ Dame nhận: ${this.totalDmgTaken.toLocaleString()}`;
        document.getElementById("end-coins").textContent =
            `🪙 Coin kiếm được: ${this.coinsThisRun}`;

        document.getElementById("screen-end")
            .classList.remove("hidden");

        if (win) {
            AudioEngine.playWin();
            this.flashScreen("#ffd700", 400);
        } else {
            AudioEngine.playDeath();
            this.flashScreen("#ff0000", 300);
        }
    }
};

// ================================================
// PASTE PHẦN 5 TIẾP THEO VÀO ĐÂY
// ================================================
// ================================================
// PHẦN 5: GS.startGame + GS.initPlayer
// ================================================
Object.assign(GS, {

    startGame(mapId) {
        AudioEngine.resume();

        // Ẩn tất cả screen
        document.querySelectorAll(".screen")
            .forEach(s => s.classList.add("hidden"));
        document.getElementById("screen-levelup")
            .classList.add("hidden");
        document.getElementById("screen-pause")
            .classList.add("hidden");

        // Lấy map & char
        this.currentMap     = DB.maps.find(m => m.id === mapId);
        this.currentCharDef = DB.chars.find(c =>
            c.id === this.save.selectedChar);
        this.lastMapId = mapId;

        // Reset state
        this.running        = true;
        this.paused         = false;
        this.gameTimer      = 0;
        this.kills          = 0;
        this.totalDmgDealt  = 0;
        this.totalSkillDmg  = 0;
        this.totalDmgTaken  = 0;
        this.coinsThisRun   = 0;
        this.level          = 1;
        this.exp            = 0;
        this.expToNext      = 30;
        this.skillCd        = 0;
        this.skill2Cd       = 0;
        this.activeSkillFx  = null;
        this.bossSpawned    = false;
        this.currentBoss    = null;
        this.spawnTimer     = 0;
        this.spawnInterval  = 2200;
        this.spawnCount     = 1;
        this.mapEventTimer  = 0;
        this.mapEventInterval = 25000;
        this.activeHazard   = null;
        this.hazardTimer    = 0;
        this.windPush       = null;
        this.gravityPull    = false;

        // Reset arrays
        this.enemies    = [];
        this.bullets    = [];
        this.expOrbs    = [];
        this.coins      = [];
        this.particles  = [];
        this.traps      = [];
        this.orbShields = [];
        this.clones     = [];

        // Init player & weapons
        this.initPlayer();
        this.initWeapons();

        // Hiện HUD
        ["hud","hud-exp-bg",
         "settings-btn","joystick-cfg-btn"].forEach(id => {
            document.getElementById(id)
                ?.classList.remove("hidden");
        });
        document.getElementById("hud-lv-text")
            .classList.remove("hidden");
        document.getElementById("joystick-zone")
            .classList.remove("hidden");

        // Skill button
        const skillBtn = document.getElementById("skill-btn");
        skillBtn.classList.remove("hidden");
        document.getElementById("skill-icon-display").textContent =
            this.currentCharDef.active?.icon || "⚡";
        document.getElementById("skill-name-display").textContent =
            this.currentCharDef.active?.name || "Skill";

        // Skill2 button
        const skill2Btn = document.getElementById("skill2-btn");
        if (this.currentCharDef.active2) {
            skill2Btn.classList.remove("hidden");
        } else {
            skill2Btn.classList.add("hidden");
        }

        // Shield bar (knight)
        const shieldWrap =
            document.getElementById("shield-bar-wrap");
        if (this.currentCharDef.id === "knight") {
            shieldWrap.classList.remove("hidden");
        } else {
            shieldWrap.classList.add("hidden");
        }

        // Boss bar ẩn ban đầu
        document.getElementById("boss-bar-wrap")
            .classList.add("hidden");

        // HUD char icon
        document.getElementById("hud-char-icon").textContent =
            this.currentCharDef.icon;

        // Start loop
        this._lastTs = performance.now();
        this.animId  = requestAnimationFrame(
            t => this.gameLoop(t));

        AudioEngine.playClick();
        this.toast(`🗺️ ${this.currentMap.name} – Bắt đầu!`);
    },

    // ─────────────────────────────────────────
    initPlayer() {
        const cd   = this.currentCharDef;
        const sv   = this.save;
        const pu   = sv.permUpgrades;

        // Perm bonus
        const bonusHp   = (pu.startHp    ||0)
                        * DB.permUpgrades.find(p=>p.id==="startHp").val;
        const bonusAtk  = (pu.startAtk   ||0)
                        * DB.permUpgrades.find(p=>p.id==="startAtk").val;
        const bonusSpd  = (pu.startSpd   ||0)
                        * DB.permUpgrades.find(p=>p.id==="startSpd").val;
        const bonusCd   = (pu.cdReduce   ||0)
                        * DB.permUpgrades.find(p=>p.id==="cdReduce").val;
        const bonusArmor= (pu.armor      ||0)
                        * DB.permUpgrades.find(p=>p.id==="armor").val;
        const bonusMag  = (pu.magnetRange||0)
                        * DB.permUpgrades.find(p=>p.id==="magnetRange").val;
        const bonusExp  = (pu.expBonus   ||0)
                        * DB.permUpgrades.find(p=>p.id==="expBonus").val;
        const bonusLuck = (pu.luck       ||0)
                        * DB.permUpgrades.find(p=>p.id==="luck").val;

        const maxHp = cd.baseHp + bonusHp;

        this.player = {
            x: this.W / 2,
            y: this.H / 2,
            r: 18,

            // HP
            hp:    maxHp,
            maxHp: maxHp,

            // Stats
            spd:          cd.baseSpd + bonusSpd,
            atkMult:      cd.baseAtk + bonusAtk,
            cdReduce:     bonusCd,
            armor:        bonusArmor,
            magnetRange:  80 + bonusMag,
            expBonus:     bonusExp,
            luck:         bonusLuck,
            skillDmgBonus:0,

            // Knight shield
            shield:       cd.id==="knight" ? 60 : 0,
            maxShield:    cd.id==="knight" ? 60 : 0,
            shieldRegenTimer: 0,

            // Status
            iframes:      0,
            slowed:       false,
            slowTimer:    0,
            slowPct:      0,
            poisoned:     false,
            poisonTimer:  0,
            poisonDmg:    0,
            poisonTickTimer: 0,

            // Speed boost
            speedBoostTimer: 0,

            // Assassin shadow
            shadowReady:  false,
            shadowTimer:  0,
            invisible:    false,
            nextHitMult:  1,

            // Warrior passive
            warriorKillBonus: 0,

            // Mage passive
            mageOverloadTimer: 0,
            mageOverloadActive: false,
            mageOverloadCd:    10000,

            // Hunter passive
            hunterPierceExtra: cd.id==="hunter" ? 1 : 0,

            // IceMage passive
            iceFreezeChance:   cd.id==="icemage" ? 0.25 : 0,

            // Char id (tiện dùng)
            charId: cd.id,

            // Visual
            color: cd.color || "#fff",
            icon:  cd.icon  || "⚔️"
        };
    }
});
