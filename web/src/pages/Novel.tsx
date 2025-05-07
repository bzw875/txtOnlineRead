import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getNovel, setNovel } from "../api";
import PageNav from "../components/pageNav";

const Novel = () => {
  let params = useParams();
  const query = new URLSearchParams(window.location.search);
  const currPage = Number(query.get('page')) || 1;
  const [page, setPage] = useState(currPage);
  

  const [novelObj, setNovelObj] = useState<any>({});
  useEffect( () => {
    getNovel(params.id, page).then((res) => {
      setNovelObj(res);
    })
  }, [params, page])

  const startLevel = [1,2,3,4,5]

  const setStarLevel = (level: number) => {
    setNovel(novelObj.id, {...novelObj, starRating: level}).then(() => {
      console.log('star rating updated')
    })
  }

  if (!novelObj.id) {
    return <div>loading</div>
  }

  const pageChange = (page: number) => {
    setPage(page);
  }


  return (
    <div className="novel-read flex flex-col">
      <h3 id="top" className="mt-4">{novelObj.name}</h3>
      <p>{novelObj.author}</p>
      <div className="flex justify-between star-list">
        {startLevel.map(tmp => <span key={tmp} 
        onClick={() => setStarLevel(tmp)} 
        className={"text-gray-500 cursor-pointer " + (novelObj.starRating === tmp ? ' active' : '')}>
          {tmp}☆
        </span>)}
      </div>
      <PageNav pageInfo={{
        currPage: page,
        wordCount: novelObj.wordCount,
        pageSize: novelObj.pageSize,
        pageChange: pageChange
      }} />
      <pre>{novelObj.content}</pre>
      <PageNav pageInfo={{
        currPage: page,
        wordCount: novelObj.wordCount,
        pageSize: novelObj.pageSize,
        pageChange: pageChange
      }} />
    </div>
  )
}
export default Novel