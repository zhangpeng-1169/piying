/**
 * 全站模拟搜索
 * 根据关键词匹配页面并提示跳转
 */
(function () {
  const searchForm = document.getElementById('navSearchForm');
  const searchInput = document.getElementById('searchInput');
  const searchToast = document.getElementById('searchToast');
  const searchToastText = document.getElementById('searchToastText');

  if (!searchForm || !searchInput) return;

  /* 可搜索的站点内容索引 */
  const searchIndex = [
    { keys: ['首页', '皮影', '陕西', '非遗'], title: '首页 · 陕西皮影戏', url: 'index.html' },
    { keys: ['概述', '分类', '民间文学', '传统音乐', '戏剧'], title: '非遗概述', url: 'overview.html' },
    { keys: ['项目', '华县', '碗碗腔', '雕刻', '阿宫腔'], title: '非遗项目', url: 'projects.html' },
    { keys: ['传承人', '汪天稳', '薛宏权', '匠人'], title: '非遗传承人', url: 'inheritros.html' },
    { keys: ['体验', '报名', '活动', 'diy', '研学'], title: '非遗体验', url: 'activity.html' },
    { keys: ['商城', '购买', '文创', '纪念品', '商品'], title: '非遗商城', url: 'mall.html' },
    { keys: ['资讯', '新闻', '公告', '动态'], title: '文化资讯', url: 'news.html' },
    { keys: ['联系', '留言', '地址', '电话', '邮箱'], title: '联系我们', url: 'contact.html' },
    { keys: ['登录', '注册', '账号'], title: '用户登录', url: 'login.html' },
    { keys: ['流程', '参观', '讲解'], title: '体验流程', url: 'experience.html' }
  ];

  function showToast(html) {
    if (!searchToast || !searchToastText) return;
    searchToastText.innerHTML = html;
    searchToast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () {
      searchToast.classList.remove('show');
    }, 5000);
  }

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
      showToast('请输入搜索关键词，如：皮影、传承人、商城');
      return;
    }

    const q = query.toLowerCase();
    const results = searchIndex.filter(function (item) {
      return item.keys.some(function (key) {
        return key.toLowerCase().includes(q) || q.includes(key.toLowerCase());
      }) || item.title.toLowerCase().includes(q);
    });

    if (results.length === 0) {
      showToast('未找到「' + query + '」相关内容，请尝试：项目、体验、商城、资讯');
      return;
    }

    if (results.length === 1) {
      window.location.href = results[0].url;
      return;
    }

    const links = results.slice(0, 4).map(function (r) {
      return '<a href="' + r.url + '">' + r.title + '</a>';
    }).join('、');
    showToast('找到多个结果：' + links);
  });
})();
