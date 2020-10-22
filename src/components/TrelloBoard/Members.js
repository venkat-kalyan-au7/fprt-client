import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addMember } from '../../Redux/actions/board';
import getInitials from '../../Helpers/getInitials';
import { TextField, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';

const Members = () => {
  const [inviting, setInviting] = useState(false);
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const boardMembers = useSelector((state) => state.board.board.members);
  const searchOptions = users.filter((user) =>
    boardMembers.find((boardMember) => boardMember.user === user._id) ? false : true
  );
  const dispatch = useDispatch();

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue && newInputValue !== '') {
      const search = (await axios.get(`https://kalyan-fprt1.herokuapp.com/api/users/${newInputValue}`)).data.slice(0, 5);
      setUsers(search && search.length > 0 ? search : []);
    }
  };

  const onSubmit = async () => {
    dispatch(addMember(user._id));
    setUser(null);
    setInputValue('');
    setInviting(false);
  };

  return (
    <div className='board-members-wrapper'>
      <div className='board-members'>
        {boardMembers.map((member) => {
          return (
            <Tooltip title={member.name} key={member.user}>
              <Avatar className='avatar'>{getInitials(member.name)}</Avatar>
            </Tooltip>
          );
        })}
      </div>
 
    </div>
  );
};

export default Members;
