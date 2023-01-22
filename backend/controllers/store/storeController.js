const asyncHandler = require("express-async-handler");
const Store = require("../../models/Store");

const createStore = asyncHandler(async (req, res) => {
    const { role, permissions } = req.body;
    const websiteId = req.websiteId;


});

const getAllStore = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const stores = await Store.find({ websiteId: websiteId }).exec();

    const formattedStores = stores.map((item) => ({
        storeName: item.storeName,
        active: true
    }));

    res.json({ data: formattedStores });
});

const getAllStorePulldown = asyncHandler(async (req, res) => {
    const websiteId = req.websiteId;
    const stores = await Store.find({ websiteId: websiteId }).exec();
    const formattedStores = stores.map((item) => {
        return {
            label: item.storeName,
            value: item._id
        }
    });

    console.log(formattedStores)

    res.json(formattedStores);
});

module.exports = {
    getAllStore,
    createStore,
    getAllStorePulldown
}