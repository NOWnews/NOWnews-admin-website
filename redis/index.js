import client from './client';
import setValue from './setValue';
import getValue from './getValue';
import getMainCategoriesRedis from './getMainCategoriesRedis';
import getRssIdByRedis from './getRssIdByRedis';

module.exports = {
    client: client,
    setValue: setValue,
    getValue: getValue,
    getMainCategoriesRedis:getMainCategoriesRedis,
    getRssIdByRedis: getRssIdByRedis
};