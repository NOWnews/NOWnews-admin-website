import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:release:action.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;
        data.excludeRolesSwitch = data.excludeRolesSwitch === 'on';
        data.timeAndRoleSwitch =  data.timeAndRoleSwitch === 'on';
        data.canSameUserReviewSwitch = data.canSameUserReviewSwitch === 'on';
        data.canSameCenterReviewSwitch = data.canSameCenterReviewSwitch === 'on';

        data.timeAndRole = {};
        if(data.timeAndRoleCenterIds){
            data.timeAndRole.setting = [];
        }
        if(data.timeAndRoleCenterIds && !_.isArray(data.timeAndRoleCenterIds)){
            data.timeAndRoleCenterIds = [data.timeAndRoleCenterIds];
            data.timeAndRoleStartHours = [data.timeAndRoleStartHours];
            data.timeAndRoleStartMinutes = [data.timeAndRoleStartMinutes];

            data.timeAndRoleEndHours = [data.timeAndRoleEndHours];
            data.timeAndRoleEndMinutes = [data.timeAndRoleEndMinutes];
        }
        _.forEach(data.timeAndRoleCenterIds, (centerId, index)=>{
            data.timeAndRole.setting.push({
                centerId : centerId,
                startHour : data.timeAndRoleStartHours[index],
                startMinute : data.timeAndRoleStartMinutes[index],
                endHour : data.timeAndRoleEndHours[index],
                endMinute : data.timeAndRoleEndMinutes[index],
                roleIds : data[`timeAndRoleRoleIds[${index}]`]
            });
        });

        if(data.excludeRoleIds && !_.isArray(data.excludeRoleIds)){
            data.excludeRoleIds = [data.excludeRoleIds];
        }
        let { data: releaseRules } = await axios.post('/releaseRules', data);

        return res.redirect(`/auth/release`);
    } catch(err) {
        return next(err);
    }
};
