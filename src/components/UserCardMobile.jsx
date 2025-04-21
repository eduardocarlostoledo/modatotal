import React, { useState } from "react";
import "../styles/UserCardMobile.css";

export const UserCardMobile = ({ user, toggleAdmin, toggleStatus }) => {
  return (
    <tr className="user-card-mobile">
      <td><img
        src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"}
        alt="avatar"
        className="user-avatar"
      /></td>
      <td>{user.name} {user.lastname}</td>
      <td>{user.email}</td>
      <td><span className={user.status ? "verde" : "rojo"}>{user.status ? "Activo" : "Baneado"}</span></td>
      <td>{user.admin ? "Administrador" : "Usuario"}</td>
      <td>
        <div className="user-card-actions">
          <button onClick={() => toggleStatus(user)}>
            {user.status ? "Banear" : "Desbanear"}
          </button>
          <button onClick={() => toggleAdmin(user)}>
            {user.admin ? "Quitar Admin" : "Hacer Admin"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export const UserTableMobile = ({ users, toggleAdmin, toggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users?.filter((u) =>
    `${u.name} ${u.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
    className="user-table-mobile">
      <input
        type="text"
        placeholder="Buscar usuario por nombre o email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="user-table-search"
      />

      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
            <UserCardMobile
              key={user.id}
              user={user}
              toggleAdmin={toggleAdmin}
              toggleStatus={toggleStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

