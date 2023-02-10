(() => {

   let yOffset = 0; //window.pageYOffset 을 담아줄 함수
   let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
   let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

   //각 씬에 대한 정보를 담고있음
   const sceneInfo = [
      {
         //0
         type: 'sticky',
         heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
         scrollHeight: 0,//스크롤 높이
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
         //sceneInfo에 있는 i번째 section의 높이 값의 style 적용
         sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      }
   }

   function scrollLoop() {
      //prevScrollHeight를 0으로 초기화함
      //초기화 작업을 해주지 않으면 스크롤 내릴때마다 scrollLoop함수가 호출되면서 스크롤 값이 누적되기 때문에 해줘야함
      prevScrollHeight = 0;
      // sceneInfo에 있는 갯수만큼 순회
      for (let i = 0; i < currentScene; i++) {
         // prevScrollHeight는 prevScrollHeight에 sceneInfo의 i번째 섹션의 scrollHeight값은 더한 값이다
         prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
      }
      //스크롤이 올라가고 내려갈때 현재 보고있는 영역이 어딘지 잡아주는 내용
      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
         currentScene++;
         // document.body.setAttribute('id', `show-scene-${currentScene}`);
      }
      if (yOffset < prevScrollHeight) {
         //브라우저 바운스 효과로 인해 스크롤 값이 -가 됬을때 오류나는 것을 방지하기(모바일)
         if (currentScene === 0) return;
         currentScene--;
         // document.body.setAttribute('id', `show-scene-${currentScene}`);
      }
      //body에 현재 보여지는 씬의 아이디값을 넣어줌
      //현재 씬을 보고있을때 css에 sticky-elem 보이고 안보이고 작성해줬음
      document.body.setAttribute('id', `show-scene-${currentScene}`);
   }




   //윈도우의 스크롤을 내릴때마다 scrollLoop 함수 호출
   //setLayout처럼 따로 호출 해줘도 되지만 scrollLoop 말고도 쓸 함수들이 많기 때문에 익명함수로 바로 호출 한것임.
   window.addEventListener('scroll', () => {
      //window.pageYOffset = 현재 스크롤 위치를 나타내쥼
      yOffset = window.pageYOffset;
      scrollLoop();
   });
   //전체 윈도우가 로드될때마다 setLayout 호출
   window.addEventListener('load', setLayout);
   //html 구조만 로드되면 함수 호출 그래서 load보다 조금 더 빠름
   // window.addEventListener('DomContentLoaded', setLayout);
   //윈도우 창의 크기가 변할때마다 setLayout 함수 호출
   window.addEventListener('resize', setLayout);
})();