import { connect } from "react-redux";
import NavBar from "./NavBar";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const LeaderBoardPage = ({ users }) => {
  const orderedUsers = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
    }))
    .sort((a, b) => a.answered + a.created - (b.answered + b.created))
    .reverse();

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <TableContainer>
          <Table sx={{ maxWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell align="right">Answered</TableCell>
                <TableCell align="right">Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt="author-avatar" src={user.avatarURL} />
                      </ListItemAvatar>
                      <ListItemText primary={user.name} secondary={user.id} />
                    </ListItem>
                  </TableCell>
                  <TableCell align="right">{user.answered}</TableCell>
                  <TableCell align="right">{user.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps)(LeaderBoardPage);