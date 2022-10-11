// Check tariff code requirements
export let getTariffRequirements = async (user, varekode) => {

    return await fetch(
        `https://gw.systema.no:8446/espedsgskat/searchTaricVarukod_SkatExport.do?applicationUser=${user}&taricVarukod=${varekode}&ajax=true`
    ).then((res) => res.json());
};

