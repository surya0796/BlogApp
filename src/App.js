// import Counter from './features/counter/counter';
import { Route } from 'react-router-dom';
import AddPostForm from './features/posts/AddPostForm';
import PostsList from './features/posts/PostsList';
import HomeLayout from './Layout/Home';
import Header from './components/Header';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<PostsList />} />
          <Route path="post" element={<AddPostForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
