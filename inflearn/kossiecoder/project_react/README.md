# 프로젝트로 배우는 React.js

#### 1. useState(prevState)

```javascript
import { useState } from "react";

const [number, setNumber] = useState(1);

const handleChange = () => {
  setNumber((prevState) => prevState * 2);
  console.log(number);
};
```

- `prevState` <br >
  => 작명 가능하나 통상적으로 prevState 칭함.<br />
  => 이전 state 값을 가져와서 변경할 수 있음.
- `console.log(number)` <br />
  => 바뀐 useState 값이 나오는 것이 아닌 이전 `number` 값이 나온다.<br />
  => 리-렌더링 후 바뀌기 때문에 바뀌기 전 `number` 값이 나오는 것이다.

<br />
<br />
<br />

#### 2. json-server

- 리액트에서 사용하는 (가짜)데이터 베이스 패키지
- [npm, json-server](https://www.npmjs.com/package/json-server)

  - `json-server command not found` 에러 발생 시 전역으로 설치

  ```
  // 글로벌용(전역)
  npm install -g json-server

  // 해당 프로젝트에만 설치 (-g 빼고 설치)
  npm i json-server
  ```

  - https://github.com/typicode/json-server#routes
    - **GET** : 가져올 때
    - **POST** : 보낼 때
    - **DELETE** : 지울 때
    ```
    GET    /posts
    GET    /posts/1
    POST   /posts
    PUT    /posts/1
    PATCH  /posts/1
    DELETE /posts/1
    ```

- 루트폴더에 `db.json` 파일 생성.

  ```javascript
  // 예시
  {
    "posts": [
      { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    "comments": [
      { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
  }
  ```

- 새로 만든 `db.json`을 `json-server`로 실행.

  ```
  json-server --watch db.json

  // 포트 번호 적용할 때
  json-server --watch db.json --port 3001
  ```

- 터미널에서 아래 URL 주소 확인 가능. => /posts 부분이 db.json 파일.

  ```
  Resources
  http://localhost:3000/posts

  Home
  http://localhost:3000
  ```

  <br />
  <br />
  <br />

#### 3. DB에 데이터 저장

- DB에 데이터 저장하기에 앞서 `axios`를 설치.
  - [npm, axios](https://www.npmjs.com/package/axios)
  ```
  npm i axios
  ```
- `json-server`

  ```
  Plural routes
  GET    /posts
  GET    /posts/1
  POST   /posts
  PUT    /posts/1      (아이디가 1인 posts를 전체 업데이트 시)
  PATCH  /posts/1      (아이디가 1인 posts를 부분 업데이트 시)
  DELETE /posts/1
  ```

- `axios post` 적용

  ```javascript
  import axios from "axios";

  const onSubmit = () => {
    axios.post("http://localhost:3000/posts", {
      title,
      body,
    });
  };
  ```

- `axios post`를 통해 보내게 되면 브라우저, 네트워크 탭에서 보낸 것을 확인할 수 있다. (터미널에서도 확인 가능)<br />
  ![3-1](./imgs/3-1.png)

- `db.json` 파일에 보낸 데이터가 등록된 것을 확인 할 수 있다.<br />
  ![3-2](./imgs/3-2.png)

<br />
<br />
<br />

#### 4. db 실행 명령어 스크립트에 넣기

- `package.json` 파일에 db를 실행시켜주는 명령어 코드를 추가 한다.
  ```javascript
  // package.json
  "scripts": {
    "start": "react-scripts start",
    "db": "json-server --watch db.json --port 3001",
  ```
- `db`를 실행시키고자 할 땐, `npm run db`

<br />
<br />
<br />

#### 5. React Router

- [react router (공홈)](https://reactrouter.com/en/main)
- 라우터(React Router) 설치
  ```
  npm install react-router-dom
  ```
- 라우터 기본 구조

  ```javascript
  import {
    BrowserRouter as Router, // BrowserRouter => Router로 사용
    Switch,
    Route,
    Link,
  } from "react-router-dom";

  function App() {
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
        </div>

        <Switch>
          <Route path="/" exact>
            Home page
          </Route>
          <Route path="/blogs">Blogs page</Route>
        </Switch>
      </Router>
    );
  }
  ```

  - `<Route path="/" exact>` : `path="/"` 처럼 주소(경로)가 "/"일 때만 해당 컴포넌트 출력.
  - `<Route path="/">` : `path="/"`처럼 주소(경로)에 들어갈 때 해당 컴포넌트 출력.

  <br />
  <br />
  <br />

#### 6. NavLink

- `NavLink`를 이용하여 `active` 효과를 줄 수 있다.
- [react router - navlink 공홈](https://reactrouter.com/en/main/components/nav-link)

  ```javascript
  import * as React from "react";
  import { NavLink } from "react-router-dom";

  function NavList() {
    let activeStyle = {
      textDecoration: "underline",
    };

    let activeClassName = "underline";

    return (
      <nav>
        <ul>
          <li>
            <NavLink
              to="messages"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
            >
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tasks"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Tasks
            </NavLink>
          </li>
  ```

- [v5 router](https://v5.reactrouter.com/web/api/NavLink/exact-bool)

  - **exact: bool** : 정확한 주소일 때. ex) /profile/edit 일 때 activeClass 적용 불가.

    ```html
    <NavLink exact to="/profile"> Profile </NavLink>
    ```

  - **strict: bool** : 엄격한

    ```html
    <NavLink strict to="/events/"> Events </NavLink>
    ```

  - exact, strice 모드 외에 다른 모드도 있다. <br />상황에 따라 맞는 모드를 적용하면 될 듯 하다. (가이드 참고, 버전에 따라 다를 수 있음.)

  <br />
  <br />
  <br />

#### 7. props children

- **기본 타입**

  - `pages/ListPage.js`

    ```javascript
    return (
      <div>
        <h1>Blogs</h1>
        {posts.map((post) => {
          return (
            <Card key={post.id} title={post.title}>
              <div className="d-flex justify-content-between">
                <div>{post.title}</div>
                <div>buttons</div>
              </div>
            </Card>
          );
        })}
      </div>
    );
    ```

  - `components/Card.js`

    - `<div className="d-flex justify-content-between">` 영역이 `children`으로 들어가게 된다.

    ```javascript
    const Card = ({ title, children }) => {
      return (
        <div className="card mb-3">
          <div className="card-body">{children}</div>
        </div>
      );
    };

    export default Card;
    ```

- **children 있을 때? 없을 때? 구분지어 적용**

  - `pages/ListPage.js`

    ```javascript
    return (
      <div>
        <h1>Blogs</h1>
        {posts.map((post) => {
          return (
            <Card key={post.id} title={post.title}>
              <button>버튼</button>
            </Card>
          );
        })}
      </div>
    );
    ```

  - `components/Card.js`
    - `<div className="d-flex justify-content-between">` 영역이 `children`으로 들어가게 된다.
    ```javascript
    const Card = ({ title, children }) => {
      return (
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>{title}</div>
              {children && <div>{children}</div>}
            </div>
          </div>
        </div>
      );
    };
    ```

<br />
<br />
<br />

#### 8. prop-types

- props 별로 타입을 정해놓으면 그거에 맞는 정보를 알맞게 가져올 수 있다.
- [npmjs, prop-types 자세히보기](https://www.npmjs.com/package/prop-types)
  <br />

```javascript
// Card.js
import PropTypes, { string } from "prop-types";

const Card = ({ title, children }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

Card.propType = {
  title: PropTypes.string,
};

// 필수 항목
Card.propType = {
  title: PropTypes.string.isRequired,
};

// 기본값 적용
Card.defaultProps = {
  title: "Title",
};

export default Card;
```

- **props types**

  - `import PropTypes from "prop-types";` 에서 `import { string } from "prop-types";`으로 <br />import 할 경우, `title: string,`으로 적용이 가능하다.

  ```javascript
  Card.propType = {
    title: PropTypes.string,
  };
  ```

- **props를 보내주지 않았을 때, 기본으로 특정 값을 보여지게 적용할 때**

  ```javascript
  Card.defaultProps = {
    title: "Title",
  };
  ```

- **특정 props를 필수 항목으로 적용해야 할 때** : `isRequired`를 적용한다.

  ```javascript
  Card.propType = {
    title: PropTypes.string.isRequired,
  };
  ```

- **children props type 정할 때**

  - 본 프로젝트에서는 리액트 엘리먼트로 적용하며, 기본값은 null
  - 만약, children에 "hi" 처럼 텍스트로 적용할 경우 에러가 발생하게 된다. (앨리먼트가 아니기 때문에!)

  ```javascript
  // 필수 항목
  Card.propType = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
  };

  // 기본값 적용
  Card.defaultProps = {
    children: null,
  };
  ```

<br />
<br />
<br />

#### 9. useHistory

- router v5 => `useHistory` <br />router v6 => `useNavigate`
- [참고 사이트](https://kangdanne.tistory.com/167)

<br />
<br />
<br />

#### 10. 이벤트 버블링

- 부모로 이벤트가 올라가는 현상을 막아줄 땐
  ```javascript
  const click = (e) => {
    e.stopPropagation();
  };
  ```
  <br />
  <br />
  <br />

#### 11. filter 함수

```javascript
const arr = [1, 2, 3];
const result1 = arr.filter((value) => {
  return value !== 1;
});

console.log(result1); // [2,3]

const result2 = arr.filter((value) => {
  return value < 3;
});

console.log(result2); // [1,2]
```

<br />
<br />
<br />

#### 12. useParams

- `useParams()`을 이용하여 현 페이지 내 파라미터 값을 가져올 수 있다.

  ```javascript
  // routes.js
  {
    path: '/blogs/:id',
    component: ShowPage
  }
  ```

  ```javascript
  // ShowPage.js
  import React from "react";
  import { useParams } from "react-router-dom";

  const ShowPage = () => {
    // routes에서 id로 적용해서 동일하게 id를 넣어주면 된다.
    const { id } = useParams();

    console.log(id);
    return <div>show page</div>;
  };

  export default ShowPage;
  ```

<br />
<br />
<br />

#### 13. 블로그 생성된 시간 추가

- 블로그 글을 작성할 때 `BlogForm.js` 파일에 현재 시간을 넘겨준다. <br />`Date.now()` 함수를 이용한다.

  ```javascript
  const onSubmit = () => {
    axios
      .post("http://localhost:3001/posts", {
        // 보낼 데이터 영역
        title,
        body,
        createdAt: Date.now(),
      })
      .then(() => {
        history.push("/blogs");
      });
  };
  ```

- `1677065410005` 처럼 숫자가 쭉 나열되서 나오는 것을 확인할 수 있다.

- 해당 숫자를 날짜로 변환해주는 함수를 만들어 준다.

  ```javascript
  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  printDate(post.createdAt);
  ```

<br />
<br />
<br />

#### 14. Pagination

1. json-server => Paginate

- [json-server 공홈](https://www.npmjs.com/package/json-server)에서 `Paginate` 가이드에 따라 적용한다.

- Use \_page and optionally \_limit to paginate returned data.<br /> In the Link header you'll get first, prev, next and last links.<br />(limit 값이 없을 땐, 기본 10으로 적용이 된다.)

  ```javascript
  GET /posts?_page=7

  // 10 items are returned by default
  GET /posts?_page=7&_limit=20
  ```

- 한 페이지당 5개씩 보여지기 하기 위해 아래와 같이 적용한다.<br />(페이지 번호는 변동으로 변수로 적용한다. 변수 디폴트 값은 1로 적용)
  ```javascript
  const getPosts = async (page = 1) => {
    axios
      .get(`http://localhost:3001/posts?_page=${page}&_limit=5`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  };
  ```

2. json-server => Sort

- 데이터를 출력해줄 때 내림차순으로 보여지게 하고 싶다면, `Sort`를 이용한다.

  - Add \_sort and \_order (ascending order by default)
    ```javascript
    GET /posts?_sort=views&_order=asc
    GET /posts/1/comments?_sort=votes&_order=asc
    ```
  - For multiple fields, use the following format:<br />`views` 또는 `user, views`처럼 정렬 기준의 해당 key 값을 적용한다.
    ```javascript
    GET /posts?_sort=user,views&_order=desc,asc
    ```
  - 오름차순 : `&_order=asc` / 내림차순 : `&_order=desc`

  - `id` 값 기준, 내림차순으로 적용하고 싶을 때
    ```javascript
    const getPosts = async (page = 1) => {
      axios
        .get(
          `http://localhost:3001/posts?_page=${page}&_limit=5&_sort=id&_order=desc`
        )
        .then((res) => {
          setPosts(res.data);
          setLoading(false);
        });
    };
    ```

3. get 주소가 너무 길어졌을 때, `params`를 이용하여 간결하게 한다.

- `params` 적용 전
  ```javascript
  const getPosts = async (page = 1) => {
    axios
      .get(
        `http://localhost:3001/posts?_page=${page}&_limit=5&_sort=id&_order=desc`
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  };
  ```
- `params` 적용 후
  ```javascript
  const getPosts = async (page = 1) => {
    axios
      .get(`http://localhost:3001/posts`, {
        params: {
          _page: page,
          _limit: 5,
          _sort: "id",
          _order: "desc",
        },
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  };
  ```

4. `publiseh`가 `true or false`로 적용되어 있는데, `true`일 때만 갖고 오고자 할 때

- `_???` => `json-start`에 있는 파라미터를 갖고올 때 쓰는 방식
- `db.json`에 key 값이 `publish`를 써주면 해당 파라미터의 값들을 가져온다.
  ```javascript
  axios.get(`http://localhost:3001/posts`, {
    params: {
      _page: page,
      _limit: 5,
      _sort: "id",
      _order: "desc",
      publish: true,
    },
  });
  ```
- admin 구분에 따라 데이터를 가져오고자 할 땐 스프레드를 이용하여 구분한다.

  ```javascript
  const getPosts = async (page = 1) => {
    let params = {
      _page: page,
      _limit: 5,
      _sort: "id",
      _order: "desc",
    };

    // 어드민이 아닐 경우, publish: true를 추가한다.
    if (!isAdmin) {
      params = { ...params, publish: true };
    }

    axios.get(`http://localhost:3001/posts`, { params }).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };
  ```

5. 정해진 숫자 `5`를 기준으로 배열을 만들고자 할 때

```javascript
// 빈 배열을 만들어 준다 => [empty, empty, empty, empty, empty]
Array(5);

// 빈배열을 1로 채워준다. => [1, 1, 1, 1, 1]
Array(5).fill(1);

// 1로 채워진 배열을 1 ~ 5로 바꿔준다. => [1, 2, 3, 4, 5]
Array(5)
  .fill(1)
  .map((val, idx) => val + idx);
```

6. getPosts로 데이터를 보낼 때, 총 보낸 데이터의 갯수를 알 수 있다.
   ![14-6](./imgs/14-6.png)<br />

- `res.headers['x-total-count']` => 총 가져온 데이터의 갯수
  ```javascript
  axios.get(`http://localhost:3001/posts`, { params }).then((res) => {
    console.log(res.headers["x-total-count"]);
  });
  ```

7. `history`와 `useLocation`을 이용하여 리스트 출력

- 브라우저 주소에 있는 데이터 정보인 page 번호를 기준으로 데이터 나열.
- useLocation을 이용하여 주소창의 정보를 가져온다.<br />
  ![14-7](./imgs/14-7.png)

  ```javascript
  const location = useLocation();

  // location.search => `?page=3`
  const params = new URLSearchParams(location.search);

  // params.get('page') => 3
  console.log(params.get("page"));
  ```

8. 일부분만 있더라도 검색되게 하려면?

```javascript
const getPosts = useCallback(
  (page = 1) => {
    let params = {
      _page: page,
      _limit: limit,
      _sort: "id",
      _order: "desc",
      title: searchText
    };
```

- `title`이 아닌 `title_like`로 적용해야 한다.

```javascript
const getPosts = useCallback(
  (page = 1) => {
    let params = {
      _page: page,
      _limit: limit,
      _sort: "id",
      _order: "desc",
      title_like: searchText
    };
```

9. Toast 만들기

- Toast 컴포넌트를 만들고 `propTypes`를 추가한다.<br />Toast는 여러개 생성될 수 있기 때문에 `[{}]` 형태로 만든다.

  ```javascript
  /**
   *  Toast.js
   *    ㄴ [{}, {}] 형태로 적용하기 위헤선
   *    ㄴ propTypes의 arrayOf와 shape를 사용하여 적용한다.
   */
  Toast.propTypes = {
    toasts: propTypes.arrayOf(
      propTypes.shape({
        text: propTypes.string,
      })
    ),
  };
  ```

- toast 클릭 시 삭제를 하기 위해 `uuid`를 사용한다.

  - [npm, uuid 바로가기](https://www.npmjs.com/package/uuid)
  - 터미널에서 `npm i uuid`
  - 문서 가이드를 참고하여 `v4` 버전을 사용한다.
    ```javascript
    import { v4 as uuidv4 } from "uuid";
    uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    ```
  - `addToast` 함수에서 toast를 넘겨받을 때, `uuid`를 추가 적용한다.
    ```javascript
    const addToast = (toast) => {
      const toastWithId = {
        ...toast,
        id: uuidv4(),
      };
      setToasts((prev) => [...prev, toastWithId]);
    };
    ```

- 클릭 외에 ??초가 지나면 자동으로 닫혀지게 적용한다.<br />`setTimeout()`을 사용하면 된다.

  ```javascript
  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = { ...toast, id };
    setToasts((prev) => [...prev, toastWithId]);

    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };
  ```

10. Form에서 글 작성 시 토스트 창 보여지게 하기

- `useState`를 이용하여 등록 후 토스트 알림을 보여지게 할 때<br />연달아 클릭 버튼을 여러 번 누르게 되면 토스트 알림이 중복으로 노출되는 상황이 발생하게 된다.
- 그래서 `useState`가 아닌 `useRef`를 이용해 본다.
- `useState` => 바뀔 때마다 리렌더링이 된다.
- `useRef` => 바로 바로 바뀐다 (즉시 변경 / 리렌더링이 되지 않는다).<br />해당 컴포넌트를 가리킬 땐, `.current` 를 사용한다.
  ```javascript
  const toasts = useRef([]);
  toasts.current;
  ```
- 리렌더링을 위해 쓰는 `useState`는 아래와 같이 사용해도 된다.

  ```javascript
  // 수정 전
  const [toastsRerender, setToastsRerender] = useState(false);

  // 수정 후
  const [, setToastsRerender] = useState(false);
  ```

11. BlogList와 BlogForm에서 반복되는 토스트 중복 함수를 합친다. (==> **Custom Hook**)

- src 폴더에 `hooks` 폴더를 생성하고 `toast.js` 파일도 생성한다.
- hooks는 앞에 **"use"**를 붙여서 함수명을 만든다.

```javascript
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useToast = () => {
  const [, setToastsRerender] = useState(false);
  const toasts = useRef([]);

  // toasts 삭제
  const deleteToast = (id) => {
    const filteredToasts = toasts.current.filter((toast) => {
      return toast.id !== id;
    });

    toasts.current = filteredToasts;
    setToastsRerender((prev) => !prev);
  };

  // toasts 추가
  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = { ...toast, id };

    toasts.current = [...toasts.current, toastWithId];
    setToastsRerender((prev) => !prev);

    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };

  // 사용하는 것을 return 한다.
  return [toasts.current, addToast, deleteToast];
};

export default useToast;
```

  <br />
  <br />
  <br />

#### 15. Toast

1. Redux, Recoil => 리액트 state를 관리하는 Tool.

- [Redux 공홈](https://ko.redux.js.org/) : https://ko.redux.js.org/
- Redux Toolkit 설치 : https://ko.redux.js.org/introduction/getting-started

  ```
  # NPM
  npm install @reduxjs/toolkit react-redux

  # Yarn
  yarn add @reduxjs/toolkit
  yarn add react-redux
  ```

- 튜토리얼 : https://redux.js.org/tutorials/quick-start

<br />

2. 적용하는 방법

- src 폴더 기준 `store.js` 파일을 생성.

  ```javascript
  // store.js
  import { configureStore } from "@reduxjs/toolkit";

  export const store = configureStore({
    reducer: {},
  });
  ```

- `src/index.js`에서 `<App />` 컴포넌트를 `<Provider store={store}>`로 감싼다.

  ```javascript
  import { Provider } from "react-redux";
  import { store } from "./store";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  ```

- [createSlice](https://redux.js.org/tutorials/quick-start#create-a-redux-state-slice)(공식 문서 참고)를 참고하여 Toast에 적용해 본다.<br />state 등 관련된 코드를 작성해야 해서 `store.js` 파일을 `store` 폴더를 만들어서 그 안으로 이동시킨다.<br />그리고 해당 폴더에서 Redux 파일들을 관리한다.
- `hooks/toast.js`에서 사용하는 state를 `store` 폴더에 `toastSlice` 파일을 만들어서 적용한다.

  ```javascript
  // store/toastSlice.js
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    toasts: [],
  };

  export const toastSLice = createSlice({
    name: "toast",
    initialState,
    reducers: {
      // 업데이트 해주는 함수
    },
  });

  export default toastSLice.reducer;
  ```

  ```javascript
  // store/store.js
  import { configureStore } from "@reduxjs/toolkit";

  // export를 reducer로 했기 때문에 toastReducer로 했음.
  import toastReducer from "./toastSlice";

  export const store = configureStore({
    reducer: {
      // 사용할 이름 : 함수
      toast: toastReducer,
    },
  });
  ```

- `components/BlogList.js`에서 만든 toast를 사용해 본다.
  ```javascript
  import { useSelector } from "react-redux";

      // redux에 저장된 전체 state를 가져온다.
      const 이름 = useSelector((state) => {
        // state.storejs에서 적용한 이름(store.js).그 이름안에 초기값 state(toastSlice.js)
        return state.toast.toasts
      })
      ```

  <br />

3. 실제 사용하는 법

- [Redux DevTools 구글 확장 프로그램](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=ko)<br />: 관리자 모드 - redux에서 확인할 수 있다.<br />
- `hooks/toast.js`에서 사용하는 `deleteToast`와 `addToast` 함수를 `redux`를 이용해 변경한다.
  <br />
  <br />
  <br />
  <br />

#### 16. Not Found Page

1. 없는 경로로 접속했을 때 `Not Found Page`로 이동.
  ```javascript
  // routes.js
  import NotFoundPage from './pages/NotFoundPage'

  const routes = [
    ...
    {
      path: "*",
      component: NotFoundPage,
    },
  ];

  export default routes;
  ```

2. `*` = 모든 경로를 의미한다. 때문에 제일 하단에 적용.

<br />
<br />
<br />
<br />

#### 17. localStorage를 이용해 로그인 상태 유지
```javascript
// 저장
localStorage.setItem('key', 'value');

// 가져오기
localStorage.getItem('key');
// 저장한 key 값을 가져온다.
```

<br />
<br />
<br />
<br />

#### 18. React Router 업그레이드
1. [react router 공식 홈페이지](https://reactrouter.com/en/main/upgrading/v5)에서 업그레이드 관련 내용이 명시되어 있다.
2. [react router - introduction](https://reactrouter.com/en/main/upgrading/v5#introduction)
  ```html
  In general, the process looks like this:

  1. Upgrade to React v16.8 or greater<br />
  2. Upgrade to React Router v5.1<br />
    - Remove &lt;Redirect&gt;s inside &lt;Switch&gt;<br />
    - Refactor custom &lt;Route&gt;s<br />
  3. Upgrade to React Router v6
  ```
  - 조건 1. 리액트 v16.8이상이어야 한다.
  - 조건 2. 라우터 v5.1일 경우 (현재 5.3.4 버전으로 패스~)
  - 조건 3. 라우터 v6로 업그레이드 진행
<br />

3. [리액트 라우터 최신 버전으로 설치](https://reactrouter.com/en/main/upgrading/v5#upgrade-to-react-router-v6)
  - 공식 문서에 따라 최신 버전으로 업그레이드 설치 한다.
    ```
    $ npm install react-router-dom
    # or, for a React Native app
    $ npm install react-router-native
    ```

  - 설치 시점에 따라 다를 수 있어 버전 6으로 설치하고자 한다면, `@버전숫자`를 적용.
    ```
    $ npm install react-router-dom@6
    ```

  - 위와 같이 하면 버전 6으로 업그레이드 된 것을 확인할 수 있다. (`package.json` 참고)

<br />

4. [switch를 routes로 바꿔라](https://reactrouter.com/en/main/upgrading/v5#upgrade-all-switch-elements-to-routes)

5. `Redirect`를 `Navigate`로 변경
  - v6에서 `Navigate`에서는 기본이 `push`여서 `replace`를 할 경우, 아래와 같이 적용한다.
  ```javascript
  // Change this:
  <Redirect to="about" />
  <Redirect to="home" push />

  // to this:
  <Navigate to="about" replace />
  <Navigate to="home" />
  ```

6. [useHistory를 useNavigate로 바꿔라](https://reactrouter.com/en/main/upgrading/v5#use-usenavigate-instead-of-usehistory)
  - v5
    ```javascript
    // This is a React Router v5 app
    import { useHistory } from "react-router-dom";

    function App() {
      let history = useHistory();
      function handleClick() {
        history.push("/home");
      }
      return (
        <div>
          <button onClick={handleClick}>go home</button>
        </div>
      );
    }
    ```
  - v6
    ```javascript
    // This is a React Router v6 app
    import { useNavigate } from "react-router-dom";

    function App() {
      let navigate = useNavigate();
      function handleClick() {
        navigate("/home");
      }
      return (
        <div>
          <button onClick={handleClick}>go home</button>
        </div>
      );
    }
    ```
    <br />

7. [Routes 구조 변경](https://reactrouter.com/en/main/upgrading/v5#relative-routes-and-links)
  - v5
    ```javascript
    // This is a React Router v5 app
    import {
      BrowserRouter,
      Switch,
      Route,
      Link,
      useRouteMatch,
    } from "react-router-dom";

    function App() {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </BrowserRouter>
      );
    }

    function Users() {
      // In v5, nested routes are rendered by the child component, so
      // you have <Switch> elements all over your app for nested UI.
      // You build nested routes and links using match.url and match.path.
      let match = useRouteMatch();

      return (
        <div>
          <nav>
            <Link to={`${match.url}/me`}>My Profile</Link>
          </nav>

          <Switch>
            <Route path={`${match.path}/me`}>
              <OwnUserProfile />
            </Route>
            <Route path={`${match.path}/:id`}>
              <UserProfile />
            </Route>
          </Switch>
        </div>
      );
    }
    ```

  - v6
    ```javascript
    // This is a React Router v6 app
    import {
      BrowserRouter,
      Routes,
      Route,
      Link,
    } from "react-router-dom";

    function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="users/*" element={<Users />} />
          </Routes>
        </BrowserRouter>
      );
    }

    function Users() {
      return (
        <div>
          <nav>
            <Link to="me">My Profile</Link>
          </nav>

          <Routes>
            <Route path=":id" element={<UserProfile />} />
            <Route path="me" element={<OwnUserProfile />} />
          </Routes>
        </div>
      );
    }
    ```

<br />

8. [activeClassName](https://reactrouter.com/en/main/upgrading/v5#remove-activeclassname-and-activestyle-props-from-navlink-)
  - 이전
    ```javascript
    <NavLink
      to="/messages"
    - style={{ color: 'blue' }}
    - activeStyle={{ color: 'green' }}
    + style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
    >
      Messages
    </NavLink>
    ```
  - v6
    ```javascript
    <NavLink
      to="/messages"
    - className="nav-link"
    - activeClassName="activated"
    + className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
    >
      Messages
    </NavLink>
    ```