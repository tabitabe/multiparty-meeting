import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import blue from '@material-ui/core/colors/blue';
// import Logger from './Logger';
// const logger = new Logger('misi');

const providers = { 
	dataporten : 'Datporten', 
	ssp        : 'SimpleSAMLphp' 
};

const styles = {
	avatar : {
		backgroundColor : blue[100],
		color           : blue[600]
	}
};

class AuthProvidersDialog extends React.Component 
{
	handleClose = () => 
	{
		this.props.onClose(this.props.selectedValue);		
	};
  
	handleListItemClick = (value) => 
	{
		this.props.onClose(value);
		
	};
  
	render() 
	{
		const { classes, onClose, selectedValue, ...other } = this.props;
		
		this.providers=providers;		

		return (
			<Dialog onClose={this.handleClose} aria-labelledby='simple-dialog-title' {...other}>
				<DialogTitle id='simple-dialog-title'>Choose Auth Provider</DialogTitle>
				<div>
					<List>					
						{Object.keys(providers).map((provider) => 
							(
								<ListItem button onClick={() => this.handleListItemClick(provider)} 
									key={provider}
								>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<PersonIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={providers[provider]} />
								</ListItem>
							
							))
						}
					</List>
				</div>
			</Dialog>
		);
	}
}
  
AuthProvidersDialog.propTypes = {
	classes       : PropTypes.object.isRequired,
	onClose       : PropTypes.func,
	selectedValue : PropTypes.string
};

const AuthProvidersDialogWrapped = withStyles(styles)(AuthProvidersDialog);

class AuthDialog extends React.Component 
{
	state = {
		open          : false,
		selectedValue : null
	};
  
	handleClickOpen = () => 
	{
		this.setState({
			open : true
		});
	};
  
	handleClose = (value) => 
	{
		this.setState({ selectedValue: value, open: false });
		this.props.roomClient.login(value);
	};
  
	render() 
	{		

		return (
			<div>
				<Avatar onClick={this.handleClickOpen}>
					<PersonIcon />
				</Avatar>
				<AuthProvidersDialogWrapped					
					selectedValue={this.state.selectedValue}
					open={this.state.open}
					onClose={this.handleClose}

				/>
			</div>
		);
	}
}

export default AuthDialog;