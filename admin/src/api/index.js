// ./admin/src/api/task.js
import axiosInstance from '../../src/utils/axiosInstance';

const requests = {
    publishToLive: async (body) => {
        const data = await axiosInstance.put(`/live-button`, body);
        return data;
    },
};
export default requests;