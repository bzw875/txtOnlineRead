import { useEffect, useState } from "react";
import { getAllNovels } from "../api";
import { NovelType } from "./types";

const Home = () => {
    const [novels, setNovels] = useState<NovelType[]>([]);
    useEffect(() => {
        getAllNovels().then(res => {
            if (res) {
                setNovels(res);
            }
        });
    }, []);

     const formatCount = (count: number) => {
        if (count < 10000) {
            return count.toString();
        }   else {
            return (count / 10000).toFixed(1) + '万';
        }
     }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>小说名称</th>
                        <th>字数</th>
                        <th>星级</th>
                        <th>阅读次数</th>
                    </tr>
                </thead>
                <tbody>
                    {novels.map(tmp => <tr key={tmp.id}>
                        <td><a href={`/novel/${tmp.id}`} className="text-blue-500">{tmp.name}</a></td>
                        <td>{formatCount(tmp.wordCount)}</td>
                        <td>{tmp.starRating}</td>
                        <td>{tmp.readCount}</td>
                    </tr>)}
                </tbody>
            </table>
            {/* {novels.map(tmp => <div>
                <h3>
                    <a href={`/novel/${tmp.id}`} className="text-blue-500">{tmp.name}</a>
                </h3>
                <div className="">
                    <div>作者：{tmp.author}</div>
                    <div>字数：{formatCount(tmp.wordCount)}</div>
                    <div>星级：{tmp.starRating}</div>
                    <div>阅读次数{tmp.readCount}</div>
                </div>
                <div>简介：{tmp.content}</div>
            </div>)} */}
        </div>
    )
}   
export default Home;
