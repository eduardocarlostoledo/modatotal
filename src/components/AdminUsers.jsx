import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag } from "antd";
import { GrUserAdmin } from "react-icons/gr";
import swal from "sweetalert";
import { FaUserCheck, FaBan } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import {
  getAllUsers,
  putUser,
  getAllUsersName,
} from "../redux/slices/userSlice";
import styles from "../styles/AdminUsers.module.css";
import { NavAdmin } from "./navAdmin";

const InfoUser = ({ email, name, image, lastname, status, country }) => {
  return (
    <div className={styles.Contenedor}>
      <div className={styles.ContenedorImg}>
        <img
          src={
            image || "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          }
          alt={name || "User Image"}
        />
      </div>
      <div className={styles.ContenedorData}>
        <h4>
          {name} {lastname}{" "}
          {status ? (
            <span className={styles.verde}>User Active</span>
          ) : (
            <span className={styles.rojo}>User Banned</span>
          )}
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
};

export const AdminUsers = () => {
  const [country, setCountry] = useState({});
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BACK}/order`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => console.log(error));
    return () => setCountry({});
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, reload]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllUsers());
  };

  const users = useSelector((state) => state.users.users || []);
  //console.log(users, "users");
  const newUsers = users?.map((user) => ({ ...user, key: user.id }));
  //console.log(newUsers, "newUsers");
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsersName(name));
    setName("");
  };

  const setAdmin = (value) => {
    const { password, ...values } = value;
    const action = value.admin ? "Quitar ADMIN" : "Sera ADMIN";

    swal({
      title: `Estas seguro que deseas ${action} a ${value.name}`,
      text: value.admin ? "Quitar ADMIN" : "Sera ADMIN",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        dispatch(PutUser({ ...values, admin: !value.admin }));
        setReload(!reload);
      }
    });
  };

  const setStatus = (value) => {
    const action = value.status ? "Banear" : "Desbanear";

    swal({
      title: `Estas seguro que deseas ${action} a ${value.name}`,
      text: value.status ? "Banear" : "Desbanear",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        dispatch(PutUser({ ...value, status: !value.status }));
      }
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      render: (value) => (
        <Tag color={value ? "green" : "red"}>
          {value ? "Admin" : "No Admin"}
        </Tag>
      ),
      filters: [
        { text: "Admin", value: true },
        { text: "No Admin", value: false },
      ],
      onFilter: (value, record) => record.admin === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={value ? "green" : "red"}>{value ? "Active" : "Banned"}</Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Banned", value: false },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      render: (value) => (
        <div>
          <button className={styles.btnIcons} onClick={() => setStatus(value)}>
            {value.status ? (
              <FaBan className={styles.banned} />
            ) : (
              <FaUserCheck className={styles.desbanned} />
            )}
          </button>

          <button className={styles.btnIcons} onClick={() => setAdmin(value)}>
            {value.admin ? (
              <GrUserAdmin className={styles.desAdmin} />
            ) : (
              <MdOutlineVerifiedUser className={styles.setAdmin} />
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <NavAdmin
        name={name}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleClick={handleClick}
      />
      <div >
        <Table
          style={{ backgroundColor: "rgb(245, 245, 235)" }}
          columns={columns}
          dataSource={newUsers}
          expandable={{
            expandedRowRender: (record) => (
              <InfoUser
                email={record.email}
                country={country}
                name={record.name}
                lastname={record.lastname}
                image={record.image}
                status={record.status}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};
