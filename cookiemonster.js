class Setting {
    static list = [];
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

    static init() {
        let back = JSON.parse(document.cookie);
        Setting.list = [];
        for (const elem of back) {
            Setting.list.push(new Setting(elem.sample, elem.size, elem.foreground, elem.background));
        }
    }

    static getAll() {
        return Setting.list;
    }

    static getOne(id) {
        return Setting.list[id];
    }

    static deleteOne(id) {
        Setting.list[id] = null;
        Setting.cookieUpdate();
    }

    static addOneMore(setting) {
        Setting.list.push(setting);
        Setting.cookieUpdate();
    }

    static cookieUpdate() {
        let temp = [];
        for (const i in Setting.list) {
            if (Setting.list[i] !== null) {
                temp.push(Setting.list[i]);
            }
        }
        document.cookie = JSON.stringify(temp);
    }
}