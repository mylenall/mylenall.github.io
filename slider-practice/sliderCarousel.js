'use strict'

class SliderCarousel{
    constructor({main, 
        wrap, 
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
    }){
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            infinity,
            position,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.slides.length - this.slidesToShow
        };
        this.position = position;

        this.responsive = responsive;
    }

    init(){
        this.addClass();
        this.addStyle();
        
        if(this.prev && this.next){
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }

        if (this.responsive) {
            this.responseInit();
        }
        
    }

    addClass() {
        this.main.classList.add('slider');
        this.wrap.classList.add('slider__wrap');
        for (const item of this.slides){
            item.classList.add('slider__item');
        }
    }

    addStyle(){
        let style = document.getElementById('SliderCarousel-style'); 
        if (!style) {
            style = document.createElement('style');
            style.id = 'SliderCarousel-style';
        }        
        style.textContent = `
            .slider{
                overflow: hidden;
            }

            .slider__wrap{
                display: flex;
                transition: transform 0.5s;
                will-change: transform;
            }

            .slider__item{
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex: 0 0 ${this.options.widthSlide}%;
                margin: auto 0 !important;
            }
        `;
        document.head.appendChild(style);
    }

    controlSlider(){
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }
    
    prevSlider(){
        if (this.options.infinity || this.options.position > 0){
            --this.options.position;
            if (this.options.position < 0){
                this.options.position = this.options.maxPosition;
            }            
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }
    nextSlider(){
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;
            if (this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
        }
        
    }

    addArrow(){
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'slider__prev';
        this.next.className = 'slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .slider__prev, .slider__next {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .slider__next {
                border-left-color: #19b5fe;
            }
            .slider__prev {
                border-right-color: #19b5fe;
            }
            .slider__prev:hover,
            .slider__next:hover,
            .slider__prev:focus,
            .slider__next:focus {
                background: transparent;
                outline: transparent;
            }
        `;

        document.head.appendChild(style);
    }

    responseInit(){
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxRespose = Math.max(... allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxRespose) {
                for (let i = 0; i < allResponse.length; i++){
                    if (widthWindow < allResponse[i]){
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    } 
                    
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        };
        checkResponse();

        window.addEventListener('resize', checkResponse);
    }

}