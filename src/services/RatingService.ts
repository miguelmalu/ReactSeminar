import http from "../http-common";
import IRating from "../types/Rating";

const getAll = () => {
    return http.get<Array<IRating>>("/ratings/");
};

const get = (name: any) => {
    return http.get<IRating>(`/ratings/${name}`);
};

const create = (data: IRating) => {
    return http.post<IRating>("/ratings/", data);
};

const update = (name: any, data: IRating) => {
    return http.put<any>(`/ratings/${name}`, data);
};

const remove = (name: any) => {
    return http.delete<any>(`/ratings/${name}`);
};

const RatingService = {
    getAll,
    get,
    create,
    update,
    remove,
};
export default RatingService;