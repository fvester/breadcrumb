# 🐩 Pokedex - 포켓몬 도감

## Github page URL

https://fvester.github.io/breadcrumb/

## 📖 과제 개요

해당 과제는 Breadcrumb UI를 Pokeapi를 활용해 제작하는 것이다.

사전 정의된 라우팅을 기반으로, 각 경로를 되돌아 갈 수 있는 로직을 만들어야 한다.

사용자가 페이지를 돌아다니며 포켓몬 종과 특징을 서칭하는 것이 꼭 도감을 보는 것과 같아 Pokedex로 정했다.

## 📌 개발환경

- node v18
- react-router-dom v6.30.1
- vite
- sass
- lodash
- react-toastify

## 🔨 테스트 방법
```zsh
$ yarn install
$ yarn run dev
```

## ✈️ 진행 순서

github issue #1: [milestone](https://github.com/fvester/breadcrumb/issues/1)

가장 고민했던 내용들
- [breadcrumb 구조 #9](https://github.com/fvester/breadcrumb/issues/9)
- [api 호출 #11](https://github.com/fvester/breadcrumb/issues/11)

## 📌 페이지 소개

```
/ - Home
```

![Image](https://github.com/user-attachments/assets/be70c052-109d-4305-9264-d7502ed357f2)

주 기능
- 로고 클릭 시 home으로 이동
- Header sticky
- Button 클릭 애니메이션(단순 css)
- /species 라우팅
- 화면 크기에 따라 크기가 바뀌도록 제작

<br/>

```
/species - Pokemon Species List
```

![Image](https://github.com/user-attachments/assets/3ea26694-b5c3-477b-b97b-22e65ed65f56)

주 기능
- Name Sorting
- Table header sticky
- Mouse hover ui

<br/>

```
/species/:species - {{pokemonSpeciesName}} Overview
```
![Image](https://github.com/user-attachments/assets/902db953-aa20-4a3f-8bf8-a05c5554e3fa)

주 기능
- ko/en 네이밍
- 간단하게 특징 보여주는 UI

<br/>

```
/species/:species/pokemons - Pokemon List
```
![image](https://github.com/user-attachments/assets/ea0a6e26-1fab-46f2-8b08-903dbadb4ced)

주 기능
- 기존 Species 페이지와 동일

<br/>

```
/species/:species/pokemons/:pokemon - {{pokemonName}}
```
![image](https://github.com/user-attachments/assets/2e5a327d-a873-4600-a366-6501ee3782bb)


주 기능
- sprite 기반 이미지 삽입
- 간단한 특징 UI

## 🔥 추가 기능

### Breadcrumb 반응형 UI

![Image](https://github.com/user-attachments/assets/c18a4fe4-2f53-4087-8bf3-4bf87c105e5b)

- width 크기가 줄면 경로가 축약됨

### Loading Indicator
![Image](https://github.com/user-attachments/assets/099097af-29e1-45b4-8b6f-fb623b474888)

- API를 통해 로딩되기 전까지는 로고 버튼 제외 클릭되지 않게 함.

### Toast message
![Image](https://github.com/user-attachments/assets/d8b66b17-ded1-4915-b611-498bb061bc56)

- breadcrumb 경로를 클릭해서 돌아간다면 navigate 팝업 메시지가 뜸.
