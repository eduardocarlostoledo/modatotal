import React, { useEffect, useState, lazy, Suspense, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Spin } from "antd";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserCheck, FaBan } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import swal from "sweetalert";
import {
  getAllUsers,
  getAllUsersName,
  putUserProfile,
} from "../redux/slices/userSlice";
import styles from "../styles/AdminUsers.module.css";
import { NavAdmin } from "./navAdmin";
import {useMediaQuery} from "../hooks/useMediaQuery.jsx";

const UserTableMobile = lazy(() => import("./UserCardMobile"));

const InfoUser = ({ email, name, image, lastname, status, country }) => (
  <div className={styles.Contenedor}>
    <div className={styles.ContenedorImg}>
      <img
        src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"}
        alt={name || "User Image"}
      />
    </div>
    <div className={styles.ContenedorData}>
      <h4>
        {name} {lastname}{" "}
        <span className={status ? styles.verde : styles.rojo}>
          {status ? "User Active" : "User Banned"}
        </span>
      </h4>
      <div className={styles.centrado}>
        <h5>Ordenes</h5>
        {Array.isArray(country) && country.length > 0 ? (
          country
            .filter((e) => e.buyer_email === email)
            .map((e, index) => (
              <h6 key={index}>
                {e.product_name} {e.product_unit_price} ${" "}
                <span
                  style={{
                    color: "green",
                    fontSize: "11px",
                    border: "0.01rem solid green",
                    padding: "2px",
                    borderRadius: "6px",
                  }}
                >
                  {e.statusId}
                </span>
              </h6>
            ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  </div>
);

export const AdminUsers = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const newUsers = useMemo(() => {
    return users.map((user) => ({ ...user, key: user.id }));
  }, [users]);

  useEffect(() => {
    dispatch(getAllUsers());
    fetch(`${import.meta.env.VITE_APP_BACK}/order`)
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllUsersName(name));
    setName("");
  };

  const handleReload = (e) => {
    e.preventDefault();
    dispatch(getAllUsers());
  };

  const toggleAdmin = (user) => {
    swal({
      title: `¿Estás seguro de ${user.admin ? "quitar" : "asignar"} admin a ${user.name}?`,
      icon: "warning",
      buttons: ["No", "Sí"],
    }).then((resp) => {
      if (resp) {
        const updated = { ...user, admin: !user.admin };
        delete updated.password;
        dispatch(putUserProfile(updated));
      }
    });
  };

  const toggleStatus = (user) => {
    swal({
      title: `¿Estás seguro de ${user.status ? "banear" : "desbanear"} a ${user.name}?`,
      icon: "warning",
      buttons: ["No", "Sí"],
    }).then((resp) => {
      if (resp) {
        dispatch(putUserProfile({ ...user, status: !user.status }));
      }
    });
  };

  const renderExpandedRow = useCallback(
    (record) => (
      <InfoUser
        email={record.email}
        country={orders}
        name={record.name}
        lastname={record.lastname}
        image={record.image}
        status={record.status}
      />
    ),
    [orders]
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
      width: 80,
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      width: 150,
      render: (text, record) => (
        <div style={{ fontWeight: 500 }}>{text} {record.lastname}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
      render: (text) => (
        <a href={`mailto:${text}`} style={{ color: '#1890ff' }}>{text}</a>
      ),
    },
    {
      title: "Admin",
      dataIndex: "admin",
      width: 120,
      render: (value) => (
        <Tag color={value ? "green" : "volcano"}>
          {value ? "Administrador" : "Usuario"}
        </Tag>
      ),
      filters: [
        { text: "Administrador", value: true },
        { text: "Usuario", value: false },
      ],
      onFilter: (value, record) => record.admin === value,
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "status",
      width: 120,
      render: (value) => (
        <Tag color={value ? "green" : "red"}>
          {value ? "Activo" : "Baneado"}
        </Tag>
      ),
      filters: [
        { text: "Activo", value: true },
        { text: "Baneado", value: false },
      ],
      onFilter: (value, record) => record.status === value,
      align: "center",
    },
    {
      title: "Acciones",
      width: 120,
      align: "center",
      render: (user) => (
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <button className={styles.btnIcons} title={user.status ? "Banear usuario" : "Activar usuario"} onClick={() => toggleStatus(user)}>
            {user.status ? <FaBan className={styles.banned} /> : <FaUserCheck className={styles.desbanned} />}
          </button>
          <button className={styles.btnIcons} title={user.admin ? "Quitar admin" : "Hacer admin"} onClick={() => toggleAdmin(user)}>
            {user.admin ? <GrUserAdmin className={styles.desAdmin} /> : <MdOutlineVerifiedUser className={styles.setAdmin} />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <NavAdmin
        name={name}
        handleInputChange={(e) => setName(e.target.value)}
        handleSubmit={handleSearch}
        handleClick={handleReload}
      />

      {!isMobile ? (
        <Table
          style={{ backgroundColor: "rgb(245, 245, 235)" }}
          columns={columns}
          dataSource={newUsers}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 10 }}
          expandable={{
            expandedRowRender: renderExpandedRow,
          }}
        />
      ) : (
        <Suspense fallback={<Spin />}> 
          <UserTableMobile
            users={newUsers}
            toggleAdmin={toggleAdmin}
            toggleStatus={toggleStatus}
          />
        </Suspense>
      )}
    </div>
  );
};
