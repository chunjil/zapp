const AppConfig = require('../resources/appConfig')

module.exports = app => {
    app.get('/api/appConfig', (request, response) => {
        let data=AppConfig.data
        if (!data)
            return response.status(404).json({
                message: '找不到全局配置数据'
            })
        response.json(data)
    })
    app.get('/api/appTheme',(request,response)=>{
        let theme=AppConfig.theme
        if(!theme)
            return response.status(404).json(
                {
                    message: '找不到全局配置数据'
                }
            )
        response.json(theme)
    })
}