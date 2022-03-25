/*jshint esversion: 6 */

function Cloud() {
    if (!(this instanceof Cloud)) {
        return new Cloud();
    }
    return this;
}

Cloud.prototype.Config_UUIDv4 = function(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.Config_UUIDv4);
};
Cloud.prototype.Config_isset = function(vars) {
    return (vars !== null) && (vars !== undefined);
};
Cloud.prototype.Config_get = function() {
    try {
        let data = (wx.getStorageSync('TOKENS') || null);
        // 是否设置了数据
        if (this.Config_isset(data)) {
            return data;
        }
        return {};
    } catch (e) {
        return {};
    }
};
// 危险的操作
Cloud.prototype.Config_reset = function(data) {
    try {
        wx.setStorageSync('API_LOCALUPDATETIME', Date.now());
        wx.setStorageSync('TOKENS', data);
        return true;
    } catch (e) {
        return false;
    }
};
Cloud.prototype.Config_inserts = function(values) {
    let data = this.Config_get();
    for (let value of values) {
        data[this.Config_UUIDv4()] = value;
    }
    try {
        wx.setStorageSync('API_LOCALUPDATETIME', Date.now());
        wx.setStorageSync('TOKENS', data);
        return true;
    } catch (e) {
        return false;
    }
};
Cloud.prototype.Config_insert = function(value) {
    let data = this.Config_get();
    data[this.Config_UUIDv4()] = value;
    try {
        wx.setStorageSync('API_LOCALUPDATETIME', Date.now());
        wx.setStorageSync('TOKENS', data);
        return true;
    } catch (e) {
        return false;
    }
};
Cloud.prototype.Config_del = function(key) {
    if (key == null) {
        return false;
    }
    let data = this.Config_get();
    data[key].is_delete = true;
    // delete data[key];
    try {
        wx.setStorageSync('API_LOCALUPDATETIME', Date.now());
        wx.setStorageSync('TOKENS', data);
        return true;
    } catch (e) {
        return false;
    }
};
Cloud.prototype.Config_force_del = function(key) {
    if (key == null) {
        return false;
    }
    let data = this.Config_get();
    data[key].force_delete = true;
    try {
        wx.setStorageSync('API_LOCALUPDATETIME', Date.now());
        wx.setStorageSync('TOKENS', data);
        return true;
    } catch (e) {
        return false;
    }
};
Cloud.prototype.Config_restore = function(key) {
    if (key == null) {
        return false;
    }
    let data = this.Config_get();
    data[key].is_delete = false;
    try {
        wx.setStorageSync('API_LOCALUPDATETIME', Date.now());
        wx.setStorageSync('TOKENS', data);
        return true;
    } catch (e) {
        return false;
    }
};
Cloud.prototype.Config_valupdate = function(key, key1, value) {
    if (key == null) {
        return false;
    }
    let data = this.Config_get();
    data[key][key1] = value;
    try {
        wx.setStorageSync('API_LOCALUPDATETIME', Date.now());
        wx.setStorageSync('TOKENS', data);
        return true;
    } catch (e) {
        return false;
    }
};
exports.Cloud = Cloud;
