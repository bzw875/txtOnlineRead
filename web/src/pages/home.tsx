import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNovels, deleteNovel } from "../api";
import { NovelType } from "./types";

const Home = () => {
    const [novels, setNovels] = useState<NovelType[]>([]);
    const [search, setSearch] = useState<string>("");
    useEffect(() => {
        getAllNovels().then(res => {
            if (res) {
                setNovels(res);
            }
        });
    }, []);

    const filterNovels =  useMemo(() => {
        if (!search) {
            return novels;
        }
        return novels.filter(tmp => tmp.name.includes(search) || tmp.author.includes(search));
    }, [search, novels]);

    const formatCount = (count: number) => {
        if (count < 10000) {
            return count.toString();
        } else {
            return (count / 10000).toFixed(1) + '万';
        }
    }
    return (<>
    <input type="text" placeholder="搜索" value={search} onChange={(e) => { setSearch(e.target.value)}}
     className="border border-gray-300 rounded p-1 w-full mb-4" />
     <div>
     共 {filterNovels.length}
     </div>
        <div className="books-table mt-4">
            {filterNovels.map(tmp => <div className="mb-4" key={tmp.id}>
                <div><Link to={`/novel/${tmp.id}`} className="text-blue-500">{tmp.name.replace('.txt', '')}</Link></div>
                <div className="anthor-div">{tmp.author}</div>
                <div className="flex items-center justify-between">
                    <span>{formatCount(tmp.wordCount)}字</span>
                    <span>{tmp.starRating}⭐️</span>
                    <span>{tmp.readCount}阅</span>
                    <span>
                        <a href="javascript:void(0)" onClick={() => {
                            if (confirm("确定删除吗？")) {
                                deleteNovel(tmp.id);
                            }
                        }} className="text-blue-500">删除</a>
                    </span>
                </div>

            </div>)}
        </div>
        </>)
}
export default Home;
