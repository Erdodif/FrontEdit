class Setting {
    static AUTO_INCREMENT = 0;
    id;
    sample;
    size;
    foreground;
    background;

    constructor(sample, size, foreground, background) {
        this.id = Setting.AUTO_INCREMENT;
        Setting.AUTO_INCREMENT++;
        this.sample = sample;
        this.size = size;
        this.foreground = foreground;
        this.background = background;
    }

    static getAll() {
        let back = JSON.parse(document.cookie);
        let list = [];
        for (const elem of back) {
            list.push(new Setting(elem.sample, elem.size, elem.foreground, elem.background));
        }
        return list;
    }

    static getOne(id){
        let list = Setting.getAll()
        let needed;
        for (const index in list){
            if(list[index].id == id){
                needed = index;
            }
        }
        return list[needed];
    }

    static deleteOne(id){
        let list = Setting.getAll()
        let needed;
        for (const index in list){
            if(list[index].id === id){
                needed = index;
            }
        }
        list.splice(needed,1);
        document.cookie = JSON.stringify(list);
    }

    static addOneMore(setting) {
        let cookie = document.cookie;
        let back;
        if (cookie !== null && cookie !== "") {
            back = JSON.parse(cookie);
        }
        else {
            back = [];
        }
        back.push(setting);
        document.cookie = JSON.stringify(back);
    }
}