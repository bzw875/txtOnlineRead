const PageNav = ({pages, currPage}: {pages: number[], currPage: number}) => {
  return (
    <div className="page-nav">
      {pages.map((page) => (
        <a href={`?page=${page}`} className={page === currPage ? 'active' : ''} key={page}>
          {page === 1 ? '首页' : page === pages.length ? '尾页' : page}
        </a>
      ))}
    </div>
  );
};

export default PageNav;