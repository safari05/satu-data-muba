import { instanceAxios, instanceFetch } from "@/helpers/instance";
import { instanceFetchDesaCantik } from "@/helpers/instance/instance";

class DatasetService {
  async getHome() {
    const res = await instanceFetch("/Sdi/GetHome");
    return await res.json();
  }

  //MODUL NEWS
  async getNewses(search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetNewses?Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }
  async getNews(slug) {
    const res = await instanceFetch(`/Sdi/GetNews?Slug=${slug}`);
    return await res.json();
  }

  // MODUL DATASET
  async getDatasetInfo() {
    const res = await instanceFetch(`/Sdi/GetDatasetInfo`);
    return await res.json();
  }
  async getDatasets(search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasets?Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }
  async getDatasetDetail(slug) {
    const res = await instanceFetch(`/Sdi/GetDataset?DataHeaderSlug=${slug}`);
    return await res.json();
  }
  async getDatasetDetailPrivate(slug) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetPrivate?DataHeaderSlug=${slug}`
    );
    return await res.json();
  }
  async getDatasetDetailPreview(slug) {
    const res = await instanceFetch(`/Sdi/GetData?Slug=${slug}`);
    return await res.json();
  }
  async getDatasetDetailPreviewPrivate(slug) {
    const res = await instanceFetch(`/Sdi/GetDataPrivate?Slug=${slug}`);
    return await res.json();
  }

  //MODUL AGENCY
  async getDatasetGroupsAgency(search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetGroupsAgency?Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }
  async getDatasetsByAgency(slug, search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetsByAgency?Slug=${slug}&Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }

  //MODUL CATEGORY
  async getDatasetGroupsCategory(search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetGroupsCategory?Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }
  async getDatasetsByCategory(slug, search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetsByCategory?Slug=${slug}&Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }

  //MODUL TAG
  async getDatasetGroupsTag(search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetGroupsTag?Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }
  async getDatasetsByTag(slug, search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetsByTag?Slug=${slug}&Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }

  //MODUL FORMAT
  async getDatasetGroupsDatasetType(search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetGroupsDatasetType?Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }
  async getDatasetsByType(slug, search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetDatasetsByType?Slug=${slug}&Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }

  //MODUL INFO GRAPHIC
  async getInfoGraphics(search, rows, page, sort) {
    const res = await instanceFetch(
      `/Sdi/GetInfoGraphic?Search=${search}&Rows=${rows}&PageNum=${page}&Sort=${sort}`
    );
    return await res.json();
  }
  async getInfoGraphicBySlug(slug) {
    const res = await instanceFetch(`/Sdi/GetInfoGraphicBySlug?Slug=${slug}`);
    return await res.json();
  }

  //MODUL INDICATOR
  async getYears() {
    const res = await instanceFetch(`/Sdi/GetYears`);
    return await res.json();
  }
  async getYearsIndicatorFinal() {
    const res = await instanceFetch(`/Sdi/GetYearsIndicatorFinal`);
    return await res.json();
  }
  async getSectorAffairs() {
    const res = await instanceFetch(`/Sdi/GetSectorAffairs`);
    return await res.json();
  }
  async getIndicatorFinal(code = "", year = new Date().getFullYear()) {
    const res = await instanceFetch(
      `/Sdi/GetIndicatorFinal?Code=${code}&Year=${year}`
    );
    return await res.json();
  }
  async getCountIndicatorFinal(code = "", year = new Date().getFullYear()) {
    const res = await instanceFetch(
      `/Sdi/GetCountIndicatorFinal?Code=${code}&Year=${year}`
    );
    return await res.json();
  }

  //MODUL SUGGESTION
  async getUserSuggestionCategory() {
    const res = await instanceFetch(`/Sdi/GetUserSuggestionCategory`);
    return await res.json();
  }
  async getDatasetCategory() {
    const res = await instanceFetch(`/Sdi/GetDatasetCategory`);
    return await res.json();
  }
  saveUserSuggestion(fd) {
    return instanceAxios.post(`/Sdi/SaveUserSuggestion`, fd);
  }

  //MODUL PUBLICATION
  async getPublicationDocument() {
    const res = await instanceFetch(
      `/Sdi/GetPublicationDocument?Search=&Rows=999999&PageNum=1&Sort=2`
    );
    return await res.json();
  }

  async getOneData() {
    const res = await instanceFetchDesaCantik(`/One/GetData`);
    return await res.json();
  }

}

export default new DatasetService();
