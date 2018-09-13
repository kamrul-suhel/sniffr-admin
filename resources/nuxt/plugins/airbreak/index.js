export default ({airbreak}) => {
    if (process.env.NODE_ENV !== 'production') return;

    if (process.browser) {
        let airbrake = new airbrakeJs.Client({
            projectId: 173150,
            projectKey: 'd99bce11ba0141789be1472f47cbb8a0'
        });
        airbrake.addFilter(function (notice) {
            notice.context.environment = 'production';
            return notice;
        });
    }
}
