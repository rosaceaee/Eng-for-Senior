# 부모님 기초영어 공부의 연습용 앱 ![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react)  ![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo)  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)

<div style="display: flex; gap: 20px; justify-content: center; align-items: center;">
   <img src="https://github.com/rosaceaee/Eng-for-Senior/blob/main/assets/images/thumb_main.jpeg" alt="thumbnail_main" style="width: 200px;"/>
   <img src="https://github.com/rosaceaee/Eng-for-Senior/blob/main/assets/images/thumb1.jpeg" alt="thumbnail_sample1" style="width: 200px;" />
   <img src="https://github.com/rosaceaee/Eng-for-Senior/blob/main/assets/images/thumb2.jpeg" alt="thumbnail_sample1" style="width: 200px" />
</div>

## 제작기
[뒤늦은 효도를 앱으로 구현한 회고](https://velog.io/@rosaceaee/review-smallgift)

## 작업 계기

- 과거에 모바일용 웹 페이지로 간단하게 공부를 돕는 툴을 구현한 적이 있었으나 많이 부족한 페이지였습니다.<br/> 그러나 근래 들어 여유가 되는 시기를 맞이하여 기회라고 생각하여 다시 제작하고 싶었습니다.
- 언어학습은 반복이 가장 중요하며 학원에서 배운 내용과 최대한 비슷한 난이도의 문장과 단어로 구성하였습니다.
- 잠깐 유튜브 보듯이 사용하면서 조금이라도 주변 환경의 언어 해상도가 높아지는 데에 도움이 되었으면 하여서 만들고 있습니다.
- **사용 대상 연령층이 보편적으로 사용하는 기종이 aos라고 생각하여 aos를 기준으로 작업하고 있습니다. <br/>ios는 테스트하고 있지 않아 되도록이면 aos환경에서 사용을 추천하고있습니다.**

## 페이지 구성

1. 알파벳

   - 알파벳 단어에 해당하는 기초 단어를 3개만 추렸습니다.
   - expo-speech를 사용하여 해당 단어를 읽게 하여 읽기와 듣기연습을 할 수 있도록 하였습니다.
   - 기초 단어의 뜻을 복습할 수 있는 간단한 퀴즈를 구현하였습니다.

2. 문장 연습
   - 기초 문장 일부를 리스트화 하였습니다.
   - 사용 연령층이 노년층이므로 최대한 눈에 띄도록 채도가 높은 색상으로 구성하였습니다.
   - 문장 만들기를 완료한 후 정답/오답 케이스 화면에서 해당 문장을 다시 듣고 읽을 수 있는 영역을 만들었습니다.

<br/>
이후 컨텐츠는 부모님과 상담 후 추후 천천히 작업 추가 예정입니다.
  
## 신경쓰고 있는 부분
   - 사용 대상자를 최소 60대 후반~70대 초반으로 선정하였습니다. <br/>
   젊은 층, 중년 층들은 앱 사용에 친숙하지만 노년층에게는 벽이 높습니다. <br/>
    그러므로 화려하고 예쁜 ui보다 최대한 화면 정보를 파악할 수 있도록 단순하게 레이아웃을 잡고 색상을 선택하고 있습니다. 
    <br/>(그러나 계속 수정중이며 부모님 피드백을 상시 요청하여 개선 예정입니다)


## UX 참고 문헌

노년층 색 지각 논문을 참고하여 컬러 팔레트를 구성중입니다. (css variable화 진행중입니다)
- [노인의 색 선호도와 색 지각 변별력의 관련성 연구 / 이경연 / 한양대학교](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003277690)
