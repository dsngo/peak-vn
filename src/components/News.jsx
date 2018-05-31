import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import React from 'react';
import { Link } from 'react-router-dom';

const styles: { [key: string]: React.CSSProperties } = {
  listInfo: {
    width:'100%',
    padding: '0 16px',
  },
};

const newsInfo = [
  {
    priority: 41231,
    url: 'https://goo.gl/1cgBmE',
    headline: 'AMAZON 0',
    date: '04/21/2018',
  },
  {
    priority: 552,
    url: 'https://goo.gl/1cgBmE',
    headline: 'AMAZON 1',
    date: '04/21/2018',
  },
  {
    priority: 34123,
    url: 'https://goo.gl/1cgBmE',
    headline: 'AMAZON 2',
    date: '04/21/2018',
  },
  {
    priority: 341223,
    url: '',
    headline: 'AMAZON 3',
    date: '04/21/2018',
  },
];

const News = ({ classes }) => (
  <List className={classes.listInfo} component="nav">
    {newsInfo.map(e => (
      <ListItem
        button={Boolean(e.url)}
        key={e.priority}
        component={Link}
        to={e.url}
        target={e.url && '_blank'}
        style={{ outline: 'none', textDecoration: 'none' }}
      >
        <ListItemIcon>
          <FiberNewIcon />
        </ListItemIcon>
        <ListItemText primary={e.headline} secondary={e.date} />
      </ListItem>
    ))}
  </List>
);

export default withStyles(styles)(News);
