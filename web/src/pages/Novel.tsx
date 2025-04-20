import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getNovel, setNovel } from "../api";
import PageNav from "../components/pageNav";

const Novel = () => {
  let params = useParams();
  const query = new URLSearchParams(window.location.search);
  
  

  const [novelObj, setNovelObj] = useState<any>({});
  useEffect( () => {
    getNovel(params.id).then((res) => {
      setNovelObj(res);
    })
  }, [params])
  const pages = useMemo(() => {
    const num = Math.ceil(novelObj.wordCount / novelObj.pageSize);
    return Array.from({length: num}, (_, i) => i + 1);
  }, [novelObj]);

  const startLevel = [1,2,3,4,5]

  const setStarLevel = (level: number) => {
    setNovel(novelObj.id, {...novelObj, starRating: level}).then(() => {
      console.log('star rating updated')
    })
  }


  return (
    <div className="novel-read">
      <h3 id="top" className="mt-4">{novelObj.name}</h3>
      <p>{novelObj.author}</p>
      <div className="flex justify-between star-list">
        {startLevel.map(tmp => <span key={tmp} onClick={() => setStarLevel(tmp)} className="text-gray-500">{tmp}☆</span>)}
      </div>
      <PageNav currPage={Number(query.get('page'))} pages={pages} />
      <pre>{novelObj.content}</pre>
      <PageNav currPage={Number(query.get('page'))} pages={pages} />
    </div>
  )
}
export default Novel