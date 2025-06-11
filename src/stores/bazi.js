import { defineStore } from 'pinia';

export const useBaziStore = defineStore('bazi', {
    state: () => ({
        inputType: 'ai', // 当前选择的输入类型：'ai', 'solar', 'lunar', 'bazi'
        aiText: '',      // AI识别模式下的文本输入
        userName: '',    // 姓名
        address: '',     // 出生地
        gender: '男',    // 性别：'男' 或 '女'

        // 公历生日数据
        solarDate: {
            year: null,
            month: null,
            day: null,
            hour: null,
            minute: null,
        },
        solarDisplay: '',

        // 农历生日数据
        lunarDate: {
            year: null,
            month: null,
            day: null,
            hour: null,
            minute: null,
        },
        lunarDisplay: '',

        // 四柱八字数据
        baziData: {
            yearGanZhi: '',
            monthGanZhi: '',
            dayGanZhi: '',
            hourGanZhi: '',
        },
    }),

    actions: {
        // 设置输入类型
        setInputType(type) {
            this.inputType = type;
        },

        // 设置AI文本
        setAiText(text) {
            this.aiText = text;
        },

        // 设置姓名
        setUserName(name) {
            this.userName = name;
        },

        // 设置出生地
        setAddress(addr) {
            this.address = addr;
        },

        // 设置性别
        setGender(g) {
            this.gender = g;
        },

        // 设置公历生日数据
        setSolarDate({ year, month, day, hour, minute, display }) {
            this.solarDate = { year, month, day, hour, minute };
            this.solarDisplay = display;
        },

        // 设置农历生日数据
        setLunarDate({ year, month, day, hour, minute, display }) {
            this.lunarDate = { year, month, day, hour, minute };
            this.lunarDisplay = display;
        },

        // 设置四柱八字数据
        setBaziData({ yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi }) {
            this.baziData = { yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi };
        },

        // 清空所有八字输入相关数据，用于重置表单等场景
        clearBaziInput() {
            this.inputType = 'ai';
            this.aiText = '';
            this.userName = '';
            this.address = '';
            this.gender = '男';
            this.solarDate = { year: null, month: null, day: null, hour: null, minute: null };
            this.solarDisplay = '';
            this.lunarDate = { year: null, month: null, day: null, hour: null, minute: null };
            this.lunarDisplay = '';
            this.baziData = { yearGanZhi: '', monthGanZhi: '', dayGanZhi: '', hourGanZhi: '' };
        },
    },

    getters: {
        // 获取完整的八字输入数据对象
        getBaziInputData: (state) => ({
            inputType: state.inputType,
            aiText: state.aiText,
            userName: state.userName,
            address: state.address,
            gender: state.gender,
            solarDate: state.solarDate,
            solarDisplay: state.solarDisplay,
            lunarDate: state.lunarDate,
            lunarDisplay: state.lunarDisplay,
            baziData: state.baziData,
        }),
    },
}); 