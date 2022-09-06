import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";

export default React.memo(function Gallery() {
    const [galleryImages, setGalleryImages] = useState([]);

    function getCollection() {
        axios
            .get("/list")
            .then((res) => {
                const imgObjects = res.data;
                setGalleryImages(imgObjects);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCollection();
    }, []);

    return (
        <div className="gallery page">
            <h2 className='subtitle text'>Doodle Gallery</h2>
            <div className="gallery-container">
                {galleryImages.map((image) => {
                    const { _id, Url } = image;
                    return (
                        <Image
                            Url={Url}
                            _id={_id}
                            key={_id}
                            setGalleryImages={setGalleryImages}
                        />
                    );
                })}
            </div>
        </div>
    );
});
