import { useMemo } from "react";
import { useParams } from "react-router-dom";

const PageNav = (props: { pageInfo: { wordCount: number, pageSize: number, currPage: number, pageChange: (page: number) => void } }) => {
  const { wordCount, pageSize, currPage, pageChange } = props.pageInfo;
  const arrPages = Math.ceil(wordCount / pageSize)
  const params = useParams();

  const pages = useMemo(() => {
    const arr = [1];
    const start = Math.max(currPage - 8, 1);
    const end = Math.min(currPage + 8, arrPages);
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    arr.push(arrPages);
    return [...new Set(arr)];
  }, [props]);

  const path = `#/novel/${params.id}`

  return (
    <div className="page-nav">
      <div className="flex justify-between quick-nav">
        <a href={`${path}?page=${currPage - 1}`} onClick={() => pageChange(currPage - 1)} className={currPage === 1 ? 'disabled' : ''} style={{ width: '30%' }}>上一页</a>
        <a href={`${path}?page=${currPage + 1}`} onClick={() => pageChange(currPage + 1)} className={currPage === pages.length ? 'disabled' : ''} style={{ width: '70%' }}>下一页</a>
      </div>
      {pages.map((page) => (
        <a href={`${path}?page=${page}`} onClick={() => pageChange(page)} className={page === currPage ? 'active' : ''} key={page}>
          {page === 1 ? '首页' : page}
        </a>
      ))}
      <input type="text" className="w-[50px]" onBlur={(e) => {
        const page = Number(e.target.value);
        if (page > 0 && page <= arrPages) {
          window.location.href = `?page=${page}`;
        }
      }} />
    </div>
  );
};

export default PageNav;