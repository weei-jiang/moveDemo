import React from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

// 过滤掉所有<i>元素
function filter(node: { tagName: string; }) {
    return (node.tagName !== 'i');
}

function DomToImg() {
    // 转为png格式的图片
    const getImg = () => {
        const node = document.getElementById("node");
     
        domtoimage.toPng(node).then((defaultUrl: string) => {
            const img = new Image();
            img.src = defaultUrl;
            img.setAttribute('className', 'pngImg');// 方便设置样式
             // 将生成的png图片插入到当前页面
            const exportImg =  document.getElementById('export-img');
            if(exportImg) {
                exportImg.appendChild(img);
            };
            // 手动点击图片下载 自动下载调用saveAs(defaultUrl, '自动保存.png')
            img.addEventListener('click', () => {
                var link = document.createElement('a');
                link.download = '古诗词.png';
                link.href = defaultUrl;
                link.click();
            })
        }).catch(() => {
            console.log("error")
        })
    }

     // 生成图片自动下载为png格式（将dom转为二进制再编译下载）
     const getBlobPng = () => {
        const node = document.getElementById("node");
        domtoimage.toBlob(node).then((blob: any) => {
            // 调用file-save方法 直接保存图片
            saveAs(blob, '自动保存.png')
        })
    }

        // 转为Jpeg图片  --- 手动下载（自动下载调用saveAs(defaultUrl, '自动保存.png'))
        const getJpeg = () => {
            const node = document.getElementById("node");
            domtoimage.toJpeg(node, { quality: 0.95 })
                .then((defaultUrl: string) => {
                    var link = document.createElement('a');
                    link.download = '下载jpeg.jpeg';
                    link.href = defaultUrl;
                    link.click();
                });
        }
        // 转为SVG图片---手动下载 （自动下载调用saveAs(defaultUrl, '自动保存.png'))
        const getSVG = () => {
            const node = document.getElementById("node");
            domtoimage.toSvg(node, { filter: filter })
                .then((defaultUrl: string) => {
                    const img = new Image();
                    img.src = defaultUrl;
                    img.setAttribute('className', 'svgImg');
                    const exportImg =  document.getElementById('export-img');
                    if(exportImg) {
                        exportImg.appendChild(img);
                    };
                    img.addEventListener('click', () => {
                        var link = document.createElement('a');
                        link.download = 'SVG';
                        link.href = defaultUrl;
                        link.click();
                    })
                });
        }

    return (
        <div className='dom-to-img'>
        <h1 className='dom-title'>html转换为图片</h1>
        <div id="node" className="node-content">
            <p className="node-title">锄禾日当午</p>
            <p className="node-title">汗滴禾下土</p>
            <p className="node-title">谁知盘中餐</p>
            <p className="node-title">粒粒皆辛苦</p>
        </div>
        <div className="my-actions">
            <button onClick={getImg} className='action'>转为png图片</button>
            <button onClick={getBlobPng} className='action'>自动保存png</button>
            <button onClick={getJpeg} className='action'>自动保存jpeg</button>
            <button onClick={getSVG} className='action'>转为svg图片</button>
        </div>
        <div id="export-img" className="my-image"></div>
    </div>
    )
}

export default DomToImg