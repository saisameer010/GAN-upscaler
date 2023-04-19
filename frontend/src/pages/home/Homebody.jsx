import React, {useState} from 'react';
import './Homebody.css';
import Grid from '@mui/material/Grid';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';


function Homebody(){

    return (
        // <Grid container className="container-test" spacing={10} minHeight={300}>

        //      <Grid className="content-block container-gifs square rounded-9 border border-primary border-5 " xs display="flex" justifyContent="center" alignItems="center">
        //      <p><h3>Image Upscaler</h3><br/>
        //         This app will help Upsclae .jpg's into higher quality ones</p>
        //         <p></p>
        //     </Grid>
        //      <Grid className="image-block container-gifs square rounded-9 border border-primary border-5 " xs display="flex" justifyContent="center" alignItems="center">
        //      <ReactCompareSlider
        //         itemOne={<ReactCompareSliderImage src={require("../../assets/demo.jpg")}  alt="Image one" />}
        //         itemTwo={<ReactCompareSliderImage src={require("../../assets/demo-out.jpg")}  alt="Image two" />}
        //         style={{}}
        //     />
        //     </Grid>
        // </Grid>
        <div className="splitScreen">
            <div className="topPane">

            <div className="heading">Image Upscaling with GAN</div>
            <div className="sub_heading">Upscale Your Images</div>
            <div className="sub_sub_heading">Upload your Images and get them upscaled to 100% of their size.</div>

            </div>
            <div className="bottomPane">
            <div className="backPaneContainer">
                <ReactCompareSlider className="image-slider" 
                    itemOne={<ReactCompareSliderImage src={require("../../assets/demo.jpg")}  alt="Image one" />}
                    itemTwo={<ReactCompareSliderImage src={require("../../assets/demo-out.jpg")}  alt="Image two" />}
                    style={{}}
                />
            </div>
            </div>
        </div>
    )
}
export default  Homebody;
