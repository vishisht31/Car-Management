import axios from "axios";
// import { toast } from "react-toastify";
export default class ApiClient {
  //   private api;
  // #api;

  constructor() {
    this.api = axios.create({
      baseURL: this.getBaseUrl(),
    });

    // this.api.interceptors.response.use(
    //   (response) => response, // Pass through successful responses
    //   (error) => {
    //     // Handle errors globally
    //     this.handleError(error);
    //     return Promise.reject(error); // Reject for local handling
    //   }
    // );
  }
  getBaseUrl() {
    return "https://car-management-backend-tuep.onrender.com"; //`${process.env.REACT_APP_SERVICE_BASE_URL}`;
  }

  //   handleError(error) {
  //     if (error.response) {
  //       // console.log(toast);
  //       // Server responded with a status outside 2xx
  //       const status = error.response.status;
  //       const errorMessage = error.response.data?.message || "An error occurred.";
  //       switch (status) {
  //         case 400:
  //           console.error(`Bad Request: ${errorMessage}`);
  //           // console.error(error)
  //           toast.error(errorMessage);
  //           break;
  //         case 401:
  //           console.error(`Unauthorized: ${errorMessage}`);
  //           //  console.error(error);
  //           toast.error(errorMessage);
  //           this.logout();
  //           // alert("Unauthorized: Please log in again.");
  //           // window.location.href = "/login"; // Example action
  //           break;
  //         case 403:
  //           console.error(`Forbidden: ${errorMessage}`);
  //           toast.error("Forbidden: You do not have permission.");
  //           break;
  //         case 404:
  //           console.error(`Not Found: ${errorMessage}`);
  //           //  console.error(error);
  //           toast.error(errorMessage);
  //           // alert("Not Found: The resource does not exist.");
  //           break;
  //         case 500:
  //           console.error(`Server Error: ${errorMessage}`);
  //           //  console.error(error);
  //           toast.error(errorMessage);
  //           // alert("Server Error: Please try again later.");
  //           break;
  //         default:
  //           console.error(`Unexpected Error: ${status} - ${errorMessage}`);
  //           // alert(`Unexpected Error: ${errorMessage}`);
  //           //  console.error(error)
  //           toast.error(errorMessage);
  //       }
  //     } else if (error.request) {
  //       // Request was made, but no response was received
  //       console.error("Network Error: No response received from the server.");
  //       toast.error("Network Error: Please check your internet connection.");
  //     } else {
  //       // Something happened while setting up the request
  //       console.error("Unexpected Error:", error.message);
  //       toast.error("An unexpected error occurred. Please try again.");
  //     }
  //   }

  async makeGetRequest(url, headers) {
    const response = await this.api.get(url, {
      headers: headers,
    });
    return response.data;
  }

  async makePostRequest(url, body, headers) {
    const response = await this.api.post(url, body, {
      headers: headers ?? {},
    });
    return response.data;
  }

  async makePutRequest(url, body, headers) {
    const response = await this.api.put(url, body, {
      headers: headers ?? {},
    });
    return response.data;
  }

  async makePatchRequest(url, body, headers) {
    const response = await this.api.patch(url, body, {
      headers: headers ?? {},
    });
    return response.data;
  }

  async makeDeleteRequest(url, headers) {
    const response = await this.api.delete(url, {
      headers: headers,
    });
    return response.data;
  }

  async logIn(body) {
    let url = "/auth/login";
    return await this.makePostRequest(url, body);
  }

  async signUp(body) {
    let url = "/auth/signup";
    return await this.makePostRequest(url, body);
  }

  async createCar(body, token) {
    let url = "/cars";
    console.log("body", body);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await this.makePostRequest(url, body, headers);
    }
    
    async getCarDetails(id, token) {
        let url = `/cars/${id}`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return await this.makeGetRequest(url, headers);
    }

  async getCarsOfUser(token) {
    let url = "/cars";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await this.makeGetRequest(url, headers);
  }

  async deleteCar(id, token) {
    let url = `/cars/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await this.makeDeleteRequest(url, headers);
  }

  async editCar(id, data, token) {
    let url = `/cars/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await this.makePatchRequest(url, data, headers);
  }
}
