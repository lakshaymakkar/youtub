import React from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import VideoList from './components/video_list'
import SearchBar from './components/search_bar'
import YTSearch from 'youtube-api-search'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyCV2Om_Zvj8Z7uHrobal5m9yA5jGxPHiq8'

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
       videos : [],
      selectedVideo: null
     };
     this.videoSearch('Punjabi')
  }

videoSearch(term)
{
  YTSearch({key: API_KEY, term: term}, (videos) =>{
    this.setState({
       videos:videos ,
       selectedVideo : videos[0]
     });
  });
}

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

	  if (this.state.videos.length === 0) {
	  	return (<div> no videos found </div>)
	  }
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))
