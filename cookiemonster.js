class Setting {
    sample;
    size;
    foreground;
    background;

    constructor(sample, size, foreground, background) {
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
        return Setting.getAll()[id];
    }

    static deleteOne(id){
        document.cookie = JSON.stringify(Setting.getAll().splice(id,1));
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
        alert(document.cookie);
    }
}