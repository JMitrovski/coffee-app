export class ApiService {
  static instance: ApiService;

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async fetchData(url: string, options?: RequestInit): Promise<Response> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}
