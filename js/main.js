(() => {
   const sceneInfo = [
      {
         //0
         type: 'sticky',
         heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
         scrollHeight: 0,
         objs: {
            container: document.querySelector('#scroll-section-0')
         }
      },
      {
         //1
         type: 'normal',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('#scroll-section-1')
         }
      },
      {
         //2
         type: 'sticky',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('#scroll-section-2')
         }
      },
      {
         //3
         type: 'normal',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('#scroll-section-3')
         }
      },
   ];

   function setLayout() {
      //각 스크롤 섹션의 높이 세팅
      //sceneInfo에 영역들을 순회하면서 높이를 재는 것
      for (let i = 0; i < sceneInfo.length; i++) {
         //sceneInfo에 있는 i번째 scrollHeight의 값
         sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
         sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      }
   }
   //브라우저의 사이즈가 바뀔때마다 setLayout함수 호출
   window.addEventListener('resize', setLayout);
   setLayout();
})();