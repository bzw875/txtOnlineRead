import { useMemo } from "react";

const PageNav = (props: {wordCount: number, pageSize: number, currPage: number}) => {
  const { wordCount, pageSize, currPage } = props;
  const arrPages = Math.ceil(wordCount / pageSize)

  const pages = useMemo(() => {
    const arr = [1];
    const start = Math.max(currPage - 5, 1);
    const end = Math.min(currPage + 5, arrPages);
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    arr.push(arrPages);
    return [...new Set(arr)];
  }, [props]);

  return (
    <div className="page-nav">
      <div className="flex justify-between quick-nav">
        <a href={`?page=${currPage - 1}`} className={currPage === 1 ? 'disabled' : ''} style={{width: '30%'}}>上一页</a>
        <a href={`?page=${currPage + 1}`} className={currPage === pages.length ? 'disabled' : ''} style={{width: '70%'}}>下一页</a>
      </div>
      {pages.map((page) => (
        <a href={`?page=${page}`} className={page === currPage ? 'active' : ''} key={page}>
          {page === 1 ? '首页' : page === arrPages ? '尾页' : page}
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