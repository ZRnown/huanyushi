import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        // 初始化用户状态，可以根据需要添加更多字段
        userInfo: null, // 用户详情对象，初始化为 null
        isLoading: false, // 用于标记是否正在加载用户数据
        error: null, // 用于存储加载错误信息
    }),

    actions: {
        // 异步 action：获取用户详情
        async fetchUserInfo() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.get('http://localhost:8088/user/profile');
                const result = response.data;

                if (response.status === 200 && result.success) {
                    this.userInfo = result.data; // 将获取到的用户数据保存到 state
                    console.log('用户数据已加载并存储到store:', this.userInfo);
                } else {
                    // 处理后端返回的非成功状态
                    this.error = result.message || '获取用户详情失败';
                    console.error('获取用户详情失败:', result);
                    // 如果后端指示未登录或认证失败，可以清空用户信息
                    if (response.status === 400) {
                        this.userInfo = null;
                    }
                }
            } catch (error) {
                // 处理网络错误或其他请求失败
                this.error = error.message || '请求用户详情出错';
                this.userInfo = null; // 请求失败时清空用户信息
                console.error('请求用户详情出错:', error);
            } finally {
                this.isLoading = false;
            }
        },

        // Action：清空用户信息（用于登出）
        clearUserInfo() {
            this.userInfo = null;
            console.log('用户信息已从store中清除');
        }

    },

    getters: {
        // 可以添加一些 getter 来方便访问 state 中的数据
        isLoggedIn: (state) => !!state.userInfo, // 判断用户是否已登录
        getUserInfo: (state) => state.userInfo, // 获取用户详情
        isLoadingUserInfo: (state) => state.isLoading, // 获取加载状态
    },
}); 