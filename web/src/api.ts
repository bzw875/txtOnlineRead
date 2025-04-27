import axios from "axios";

export const api = axios.create({
    baseURL: '/api'
})

export const getAllNovels = async () => {
    const response = await api.get('/novels')
    return response.data
}

export const getNovel = async (id: string) => {
    const response = await api.get(`/novel/${id}`)
    return response.data
}

export const deleteNovel = async (id: string) => {
    const response = await api.delete(`/novel/${id}`)
    return response.data
}

export const setNovel = async (id: string, novel: any) => {
    const response = await api.post(`/novel/${id}`, novel)
    return response.data
}