new Vue({
    el: "#app",
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
        },

        attack(special){
            this.specialAttack('playerLife', 5, 10, special, 'Player', 'Monster', 'player');
            if (this.monsterLife > 0) {
                this.specialAttack('monsterLife', 7, 12, special, 'Monster', 'Player', 'monster');   
            }
        },

        specialAttack(player, min , max, special, source, target, style) {
            const plus =special ? 5 : 0;
            const damage = this.gettRandom(min + plus, max + plus);
            this[player] = Math.max(this[player] - damage, 0);
            this.registerLog(`${source} atingiu ${target} com ${damage}.`, style);
        },

        healAndHurt(){
            this.heal(10, 15);
            this.specialAttack('playerLife', 7, 12, false, 'Monster', 'Player', 'monster');
        },

        heal(min, max){
            const heal = Math.random(min, max)
            this.playerLife = Math.max(this.playerLife + heal, 100);
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player');
        },

        gettRandom(min, max){
            const value = Math.random() * (max - min) + min;
            return Math.round(value);
        },

        giveUp(){
            this.running = false
        },

        registerLog(text, style){
            this.logs.unshift({text, style});
        }
    },
    watch: {
        hasResult(value){
            if (value) {
                this.running = false;
            }
        }
    }
})