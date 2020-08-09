import React, { useState, useEffect } from 'react';
import wordpress from '../api/wordpress';
import 'normalize.css';
import './App.scss';

const App = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {
            const { data } = await wordpress.get('wp-json/wp/v2/instrument?_embed');
            setBlogs(data);
            console.log(data);
        };

        getBlogs();
    }, []);

    const renderedBlogs = blogs.map(blog => {
        return (
            <div key={blog.id} className='single-blog-excerpt'>
                <img src={blog._embedded['wp:featuredmedia'][0].source_url} />
                <h2>{blog.title.rendered}</h2>
                <div
                    dangerouslySetInnerHTML={{
                        __html: blog.excerpt.rendered
                    }}
                ></div>
            </div>
        );
    });

    return <div className='app'>{renderedBlogs}</div>;
};

export default App;
