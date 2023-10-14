import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 7,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Hello im a constructor");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `myNews - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=11deec3d60534b78b9f4f37cda46bcf3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        // console.log("cdm");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=11deec3d60534b78b9f4f37cda46bcf3&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({
        //     articles: parseData.articles, 
        //     totalResults: parseData.totalResults,
        //     loading:false
        // })
        this.updateNews();
    }

    handlePrevClick = async () => {
        console.log("Previous");

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=11deec3d60534b78b9f4f37cda46bcf3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parseData = await data.json();
        // console.log(parseData);

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNextClick = async () => {
        console.log("Next");

        //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {

        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=11deec3d60534b78b9f4f37cda46bcf3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     console.log(parseData);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles,
        //         loading:false
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=11deec3d60534b78b9f4f37cda46bcf3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    render() {
        console.log("Hello i am render");
        return (
            <div className='container my-4'>
                <h1 className='text-center'>My News - Top headlins from {this.capitalizeFirstLetter(this.props.category)} category </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 70) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </div>
        )
    }
}

export default News

// <div className="container d-flex justify-content-between ">
//                     // <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>Previous</button>
//                     <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
//                 </div>