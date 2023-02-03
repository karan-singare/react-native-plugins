import React, {Component} from "react";
import {Text, View} from "react-native";
import GenresSDK from "./genres.sdk";
import genreStyles from "./genres.styles";

export interface Props {
  styles?: any;
  onPress?: any;
  appId: string;
  appUrl: string;
}

interface State {
  genres: any[];
}

export default class Genres extends Component<Props, State> {
  public appId: string;
  public appUrl: string;
  constructor(props: any) {
    super(props);
    this.appId = props.appId;
    this.appUrl = props.appUrl;
    this.state = {
      genres: [],
    }
  }

  componentDidMount = async () => {
    try {
      const genres = await this.getGenres();
      this.setState({genres});
    } catch (e) {
      console.log('error in componentDidMount in Genres');
      console.log(e);
    }
  }

  render() {
    const {styles, onPress} = this.props;
    return (
      <View style={genreStyles.categoryContentStyle}>
        <View style={[genreStyles.typesOfGenres]}>
          {this.state.genres.map(item => (
            <Text
              key={item.name}
              onPress={onPress}
              style={[
                genreStyles.typesOfMoviesAndWebSeriesWrapStyle,
                styles && styles,
                { color: 'white', fontSize: 15.0 },
                { textTransform: "capitalize" },
              ]}>
              {item.name}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  getGenres = async () => {
    try {
      const {appId, appUrl} = this.props;
      const {data} =  await new GenresSDK(appId, appUrl).getGenres();
      return  data;
    } catch (error) {
      console.log('error while loading genres');
      console.log(error);
    }
  };

}

