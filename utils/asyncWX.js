// promise 形式的getSetting
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
}

export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
};

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
};

export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
}

export const showToast = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: true,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
}

export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
}

// 微信官方提供的支付接口
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
}