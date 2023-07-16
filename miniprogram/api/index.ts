import { request } from "../utils/promise"

export function reqAnimationList(data: any) {
    return request.get("http://localhost:5000/user/getAnimationList", {
        data
    })
}

export function reqCategory() {
    return request.get("http://localhost:5000/user/getCategory")
}

export function reqCategoryList(data: any) {
    return request.get("http://localhost:5000/user/getCategoryList", {
        data
    })
}

export function reqRank() {
    return request.get("http://localhost:5000/user/getRank")
}

export function reqRankList(data: any) {
    return request.get("http://localhost:5000/user/getRankList", {
        data
    })
}

export function reqAnimationById(animation_id: number) {
    return request.get("http://localhost:5000/user/getAnimationById", {
        data: {
            animation_id
        }
    })
}

export function reqAnimationRecommendList(animation_id: number) {
    return request.get("http://localhost:5000/user/getAnimationRecommendList", {
        data: {
            animation_id
        }
    })
}

export function reqSearchList(data: any) {
    return request.get("http://localhost:5000/user/getSearchList", {
        data
    })
}

