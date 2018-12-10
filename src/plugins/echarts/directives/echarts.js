import echarts from 'echarts';
import store from '@state/store'

export default {
    bind: (el) => {
        el.resizeEventHandler = () => el.echartsInstance.resize();

        if ( window.attachEvent ) {
            window.attachEvent('onresize', el.resizeEventHandler);
        } else {
            window.addEventListener('resize', el.resizeEventHandler, false);
        }
    },

    inserted: (el, binding) => {
        store.dispatch('config/getAppTheme').then(appTheme=>{
            el.echartsInstance = echarts.init(el,appTheme.name);
            el.echartsInstance.setOption(binding.value);
        });

    },

    update: (el, binding) => {
        el.echartsInstance.setOption(binding.value);
    },

    unbind: (el) => {
        if ( window.attachEvent ) {
            window.detachEvent('onresize', el.resizeEventHandler);
        } else {
            window.removeEventListener('resize', el.resizeEventHandler, false);
        }

        el.echartsInstance.dispose();
    }
}
